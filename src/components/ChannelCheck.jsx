import React, { useState } from 'react'

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const FACEBOOK_API_TOKEN = import.meta.env.VITE_FACEBOOK_API_TOKEN

async function fetchYoutubeChannelDetailsById(channelId){
  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${encodeURIComponent(channelId)}&key=${YOUTUBE_API_KEY}`)
  return response.json()
}

async function fetchYoutubeChannelDetailsByUsername(username){
  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=${encodeURIComponent(username)}&key=${YOUTUBE_API_KEY}`)
  return response.json()
}

async function searchYoutubeChannelByQuery(query){
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`)
  return response.json()
}

async function fetchFacebookPageDetails(pageId){
  const response = await fetch(`https://graph.facebook.com/v18.0/${encodeURIComponent(pageId)}?fields=name,fan_count,followers_count,about,link,posts.limit(0).summary(true),videos.limit(0).summary(true)&access_token=${FACEBOOK_API_TOKEN}`)
  return response.json()
}

function parseChannelUrl(value){
  try {
    const url = new URL(value)
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase()
    const path = url.pathname.replace(/\/+$/, '')
    const parts = path.split('/').filter(Boolean)

    if(hostname.includes('youtube.com') || hostname.includes('youtu.be')){
      if(hostname === 'youtu.be' && parts[0]){
        return { platform: 'youtube', type: 'id', value: parts[0] }
      }
      if(parts[0] === 'channel' && parts[1]){
        return { platform: 'youtube', type: 'id', value: parts[1] }
      }
      if(parts[0] === 'user' && parts[1]){
        return { platform: 'youtube', type: 'username', value: parts[1] }
      }
      if(parts[0] === 'c' && parts[1]){
        return { platform: 'youtube', type: 'custom', value: parts[1] }
      }
      const atValue = parts.find(part => part.startsWith('@'))
      if(atValue){
        return { platform: 'youtube', type: 'custom', value: atValue.slice(1) }
      }
      if(parts.length > 0){
        return { platform: 'youtube', type: 'custom', value: parts[parts.length - 1] }
      }
    }

    if(hostname.includes('facebook.com')){
      const queryId = url.searchParams.get('id')
      if(queryId){
        return { platform: 'facebook', type: 'id', value: queryId }
      }
      if(parts[0] === 'pages' && parts[1]){
        if(parts[2]){
          return { platform: 'facebook', type: 'id', value: parts[2] }
        }
        return { platform: 'facebook', type: 'name', value: parts[1] }
      }
      if(parts.length > 0){
        return { platform: 'facebook', type: 'name', value: parts[0] }
      }
    }

    return null
  } catch (err) {
    return null
  }
}

export default function ChannelCheck({ onConnect }){
  const [platform, setPlatform] = useState('youtube')
  const [channelUrl, setChannelUrl] = useState('')
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()

    if(!channelUrl.trim() && files.length === 0){
      setError('Masukkan URL YouTube atau Facebook, atau unggah screenshot analitik untuk perhitungan yang lebih presisi.')
      return
    }

    const isFacebookUrl = channelUrl.includes('facebook.com')
    const isYoutubeUrl = channelUrl.includes('youtube.com') || channelUrl.includes('youtu.be')
    if(channelUrl.trim() && !isYoutubeUrl && !isFacebookUrl){
      setError('URL tidak valid. Harus berisi youtube.com, youtu.be, atau facebook.com.')
      return
    }

    if(isYoutubeUrl && !YOUTUBE_API_KEY){
      setError('API key YouTube tidak ditemukan. Tambahkan VITE_YOUTUBE_API_KEY di .env.local.')
      return
    }

    if(isFacebookUrl && !FACEBOOK_API_TOKEN){
      setError('Token Facebook tidak ditemukan. Tambahkan VITE_FACEBOOK_API_TOKEN di .env.local.')
      return
    }

    setError('')
    setLoading(true)

    try {
      if(channelUrl.trim()){
        const parsed = parseChannelUrl(channelUrl.trim())
        if(!parsed){
          throw new Error('Tidak dapat membaca URL. Gunakan URL YouTube atau Facebook yang valid.')
        }

        if(parsed.platform === 'youtube'){
          let channelData = null

          if(parsed.type === 'id'){
            const result = await fetchYoutubeChannelDetailsById(parsed.value)
            if(result.items?.length) channelData = result.items[0]
          } else if(parsed.type === 'username'){
            const result = await fetchYoutubeChannelDetailsByUsername(parsed.value)
            if(result.items?.length) channelData = result.items[0]
          } else {
            const searchResult = await searchYoutubeChannelByQuery(parsed.value)
            if(searchResult.items?.length){
              const channelId = searchResult.items[0].snippet.channelId
              const details = await fetchYoutubeChannelDetailsById(channelId)
              if(details.items?.length) channelData = details.items[0]
            }
          }

          if(!channelData){
            throw new Error('Channel YouTube tidak ditemukan. Coba gunakan URL channel yang lengkap.')
          }

          const stats = channelData.statistics || {}
          const name = channelData.snippet?.title || 'Channel Anda'
          const subscribers = Number(stats.subscriberCount || 0)
          const videos = Number(stats.videoCount || 0)
          const watchHours = Math.round(Number(stats.viewCount || 0) / 50)

          onConnect({
            name,
            subscribers,
            watchHours,
            videos,
            source: 'youtube',
            channelUrl: channelUrl.trim(),
            thumbnail: channelData.snippet?.thumbnails?.high?.url
          })
        } else {
          const pageData = await fetchFacebookPageDetails(parsed.value)
          if(pageData.error){
            throw new Error(pageData.error.message || 'Tidak dapat memuat data Facebook. Periksa URL atau token Anda.')
          }

          const name = pageData.name || 'Halaman Facebook'
          const followers = Number(pageData.followers_count || pageData.fan_count || 0)
          const postCount = Number(pageData.posts?.summary?.total_count || 0)
          const videoCount = Number(pageData.videos?.summary?.total_count || 0)

          onConnect({
            name,
            subscribers: followers,
            watchHours: 0,
            videos: videoCount,
            source: 'facebook',
            channelUrl: channelUrl.trim(),
            thumbnail: null,
            facebookLink: pageData.link || channelUrl.trim(),
            facebookPostCount: postCount,
            facebookVideoCount: videoCount
          })
        }
      } else {
        onConnect({
          name: 'Channel dari Screenshot',
          subscribers: 0,
          watchHours: 0,
          videos: 0,
          source: 'images',
          screenshotCount: files.length
        })
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data channel.')
    } finally {
      setLoading(false)
    }
  }

  function handleFiles(e){
    setFiles(Array.from(e.target.files))
  }

  return (
    <div className="channel-check">
      <h4>Cek Channel Anda</h4>
      <p className="step-note">Masukkan URL channel YouTube atau Facebook, atau unggah screenshot halaman profil/analitik agar perhitungan makin presisi.</p>

      <form onSubmit={handleSubmit} style={{marginTop:18}}>
        <div className="platform-tabs">
          <button
            type="button"
            className={`tab ${platform === 'youtube' ? 'active' : ''}`}
            onClick={() => setPlatform('youtube')}
          >
            YouTube
          </button>
          <button
            type="button"
            className={`tab ${platform === 'facebook' ? 'active' : ''}`}
            onClick={() => setPlatform('facebook')}
          >
            Facebook
          </button>
        </div>

        <label style={{display:'block',margin:'16px 0 8px',fontSize:13,color:'var(--muted)'}}>Contoh URL {platform === 'youtube' ? 'YouTube' : 'Facebook'}</label>
        <input
          className="input"
          value={channelUrl}
          onChange={e=>setChannelUrl(e.target.value)}
          placeholder={platform === 'youtube'
            ? 'https://www.youtube.com/channel/UC123...'
            : 'https://www.facebook.com/namaHalaman'}
        />

        <p style={{color:'var(--muted)',margin:'10px 0 16px',fontSize:13}}>
          Contoh halaman profil dan analitik Anda membantu rekomendasi lebih akurat.
        </p>

        <label style={{display:'block',marginBottom:8,fontSize:13,color:'var(--muted)'}}>Unggah screenshot profil atau analitik</label>
        <input
          className="input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
        />
        {files.length > 0 && (
          <div style={{marginTop:10,color:'#111827'}}>{files.length} file dipilih</div>
        )}

        <div style={{marginTop:18, display:'flex', gap:10, flexWrap:'wrap'}}>
          <button className="cta" type="submit" disabled={loading}>{loading ? 'Memuat...' : 'Lanjutkan'}</button>
          <button className="secondary" type="button" onClick={()=>{setChannelUrl(''); setFiles([]); setError('')}}>Reset</button>
        </div>
      </form>

      {error && <div style={{color:'#dc2626',marginTop:12}}>{error}</div>}
    </div>
  )
}
