// ponytail: web player mã nguồn mở Artplayer + Hls.js; nâng cấp WebSocket khi cần phòng xem chung.
const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3333;

const PLAYLIST = {
  gia_thien: {
    title: "Già Thiên (Anime 3D - Direct HLS)",
    type: "hls",
    episodes: [
      { name: "Tập 1", url: "https://s3.phim1280.tv/20240411/n2i5u9Ux/index.m3u8" },
      { name: "Tập 2", url: "https://s3.phim1280.tv/20240411/QR9inWeS/index.m3u8" },
      { name: "Tập 3", url: "https://s3.phim1280.tv/20240411/1G9HOSgg/index.m3u8" },
      { name: "Tập 4", url: "https://s3.phim1280.tv/20240411/nLr8rAmD/index.m3u8" },
      { name: "Tập 5", url: "https://s3.phim1280.tv/20240411/qYVFjEDP/index.m3u8" },
      { name: "Tập 6", url: "https://s3.phim1280.tv/20240411/rZWvyJEx/index.m3u8" },
      { name: "Tập 7", url: "https://s3.phim1280.tv/20240411/IyMDf8n1/index.m3u8" },
      { name: "Tập 8", url: "https://s3.phim1280.tv/20240411/JULm5v0y/index.m3u8" },
      { name: "Tập 9", url: "https://s3.phim1280.tv/20240411/K0I5KuMx/index.m3u8" },
      { name: "Tập 10", url: "https://s3.phim1280.tv/20240411/wVaQBTy4/index.m3u8" }
    ]
  },
  ban_gai_thien_tai: {
    title: "Bạn Gái Thiên Tài (10 Tập - Direct HLS)",
    type: "hls",
    episodes: [
      { name: "Tập 1", url: "https://v7.kkphimplayer7.com/20260802/fbamEVcB/index.m3u8" },
      { name: "Tập 2", url: "https://v7.kkphimplayer7.com/20260802/S9PlBxvb/index.m3u8" },
      { name: "Tập 3", url: "https://v7.kkphimplayer7.com/20260802/WorxgvT8/index.m3u8" },
      { name: "Tập 4", url: "https://v7.kkphimplayer7.com/20260802/CrWplXm5/index.m3u8" },
      { name: "Tập 5", url: "https://v7.kkphimplayer7.com/20260802/w4S1WPXi/index.m3u8" },
      { name: "Tập 6", url: "https://v7.kkphimplayer7.com/20260802/WRPYJUt1/index.m3u8" },
      { name: "Tập 7", url: "https://v7.kkphimplayer7.com/20260803/BRCPEZ3V/index.m3u8" },
      { name: "Tập 8", url: "https://v7.kkphimplayer7.com/20260803/0QLNoCDk/index.m3u8" },
      { name: "Tập 9", url: "https://v7.kkphimplayer7.com/20260804/YK7VLYxY/index.m3u8" },
      { name: "Tập 10", url: "https://v7.kkphimplayer7.com/20260804/69WWc4R7/index.m3u8" }
    ]
  },
  yanhh3d_embed: {
    title: "Giới Môn Chi Hạ (yanhh3d.ee Iframe)",
    type: "iframe",
    referer: "https://yanhh3d.ee/",
    episodes: [
      { name: "Tập 1", url: "https://streamfree.vip/embed/v/wLVZHbv4" },
      { name: "Tập 2", url: "https://streamfree.vip/embed/v/vdLWSvsq" },
      { name: "Tập 3", url: "https://streamfree.vip/embed/v/8qpQn5F3" },
      { name: "Tập 4", url: "https://streamfree.vip/embed/v/Qs9dxdhy" },
      { name: "Tập 5", url: "https://streamfree.vip/embed/v/Mu2JA3NZ" },
      { name: "Tập 6", url: "https://streamfree.vip/embed/v/U7wpCb4j" },
      { name: "Tập 7", url: "https://streamfree.vip/embed/v/JsGyGR3Y" },
      { name: "Tập 8", url: "https://streamfree.vip/embed/v/JqZ4zY7S" },
      { name: "Tập 9", url: "https://streamfree.vip/embed/v/LwfYXva5" },
      { name: "Tập 10", url: "https://streamfree.vip/embed/v/yyTwT7L9" }
    ]
  }
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname === '/' || reqUrl.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VietStream Hub · Open Video Engine</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0b0f19; color: #f1f5f9; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    header { background: #111827; padding: 10px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1f2937; gap: 12px; flex-wrap: wrap; }
    .brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; color: #38bdf8; letter-spacing: -0.5px; }
    .tabs { display: flex; gap: 6px; }
    .tab-btn { background: #1f2937; color: #94a3b8; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: all .15s; }
    .tab-btn:hover { color: #f1f5f9; background: #374151; }
    .tab-btn.active { background: #0284c7; color: #fff; }
    .custom-input { display: flex; gap: 6px; flex: 1; max-width: 480px; }
    .custom-input input { flex: 1; background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #f8fafc; font-size: 12px; outline: none; }
    .custom-input button { background: #059669; border: none; border-radius: 6px; color: white; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 600; }
    .main { display: flex; flex: 1; height: calc(100vh - 54px); }
    .sidebar { width: 280px; background: #111827; border-right: 1px solid #1f2937; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
    .sidebar h2 { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; letter-spacing: 0.5px; }
    .ep-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
    .ep-btn { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 8px; border-radius: 6px; text-align: center; cursor: pointer; font-size: 13px; font-weight: 500; transition: all .15s; }
    .ep-btn:hover { background: #334155; color: #fff; }
    .ep-btn.active { background: #0284c7; border-color: #38bdf8; color: #fff; font-weight: 700; box-shadow: 0 0 10px rgba(2,132,199,0.5); }
    .player-container { flex: 1; background: #000; position: relative; display: flex; align-items: center; justify-content: center; }
    #artplayer-view { width: 100%; height: 100%; }
    #iframe-view { width: 100%; height: 100%; border: none; display: none; }
    .engine-tag { position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); backdrop-filter: blur(4px); border: 1px solid #334155; color: #38bdf8; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; pointer-events: none; z-index: 20; }
  </style>
</head>
<body>
  <header>
    <div class="brand">VietStream · OpenEngine</div>
    <div class="tabs">
      <button class="tab-btn active" onclick="switchSeries('gia_thien')">Già Thiên (10 Tập)</button>
      <button class="tab-btn" onclick="switchSeries('ban_gai_thien_tai')">Bạn Gái Thiên Tài (10 Tập)</button>
      <button class="tab-btn" onclick="switchSeries('yanhh3d_embed')">Giới Môn (Iframe)</button>
    </div>
    <div class="custom-input">
      <input id="custom-url" type="text" placeholder="Dán link m3u8 bất kỳ vào đây..." />
      <button onclick="playCustomUrl()">Tải Stream</button>
    </div>
  </header>
  <div class="main">
    <div class="sidebar">
      <h2 id="series-title">Danh Sách Tập</h2>
      <div id="ep-grid" class="ep-grid"></div>
    </div>
    <div class="player-container">
      <span id="engine-tag" class="engine-tag">Artplayer · Hls.js</span>
      <div id="artplayer-view"></div>
      <iframe id="iframe-view" allow="fullscreen; autoplay"></iframe>
    </div>
  </div>
  <script>
    const playlistData = ${JSON.stringify(PLAYLIST)};
    let currentSeriesKey = 'gia_thien';
    let currentEpisodeIdx = 0;
    let artInstance = null;
    let hlsInstance = null;

    function initArtplayer(url) {
      if (artInstance) {
        artInstance.destroy(false);
      }
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }

      document.getElementById('artplayer-view').style.display = 'block';
      document.getElementById('iframe-view').style.display = 'none';
      document.getElementById('engine-tag').innerText = 'Artplayer · Direct HLS';

      artInstance = new Artplayer({
        container: '#artplayer-view',
        url: url,
        type: 'm3u8',
        customType: {
          m3u8: function (video, src) {
            if (Hls.isSupported()) {
              hlsInstance = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90
              });
              hlsInstance.loadSource(src);
              hlsInstance.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = src;
            }
          }
        },
        autoplay: true,
        autoSize: true,
        playbackRate: true,
        setting: true,
        hotkey: true,
        pip: true,
        fullscreen: true,
        fullscreenWeb: true,
        theme: '#0284c7',
        lang: 'vi'
      });

      artInstance.on('video:ended', () => {
        const episodes = playlistData[currentSeriesKey]?.episodes;
        if (episodes && currentEpisodeIdx + 1 < episodes.length) {
          selectEpisode(currentEpisodeIdx + 1);
        }
      });
    }

    function switchSeries(key) {
      currentSeriesKey = key;
      document.querySelectorAll('.tab-btn').forEach((b, i) => {
        b.classList.toggle('active', 
          (i === 0 && key === 'gia_thien') ||
          (i === 1 && key === 'ban_gai_thien_tai') ||
          (i === 2 && key === 'yanhh3d_embed')
        );
      });

      const series = playlistData[key];
      document.getElementById('series-title').innerText = series.title;
      renderEpisodes();
      selectEpisode(0);
    }

    function renderEpisodes() {
      const grid = document.getElementById('ep-grid');
      grid.innerHTML = '';
      const episodes = playlistData[currentSeriesKey].episodes;
      episodes.forEach((ep, idx) => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn' + (idx === currentEpisodeIdx ? ' active' : '');
        btn.innerText = ep.name;
        btn.onclick = () => selectEpisode(idx);
        grid.appendChild(btn);
      });
    }

    function selectEpisode(idx) {
      currentEpisodeIdx = idx;
      document.querySelectorAll('.ep-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
      const ep = playlistData[currentSeriesKey].episodes[idx];
      const series = playlistData[currentSeriesKey];

      if (series.type === 'iframe') {
        if (artInstance) {
          artInstance.destroy(false);
          artInstance = null;
        }
        document.getElementById('artplayer-view').style.display = 'none';
        const iframe = document.getElementById('iframe-view');
        iframe.style.display = 'block';
        document.getElementById('engine-tag').innerText = 'Iframe · Fallback';
        iframe.src = '/embed?url=' + encodeURIComponent(ep.url) + '&ref=' + encodeURIComponent(series.referer);
      } else {
        initArtplayer(ep.url);
      }
    }

    function playCustomUrl() {
      const url = document.getElementById('custom-url').value.trim();
      if (!url) return;
      initArtplayer(url);
    }

    switchSeries('gia_thien');
  </script>
</body>
</html>`);
  }

  if (reqUrl.pathname === '/embed') {
    const targetUrl = reqUrl.searchParams.get('url');
    const referer = reqUrl.searchParams.get('ref');
    if (!targetUrl) return res.writeHead(400).end('Thieu param ?url');

    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;

    const proxyReq = client.request(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Referer': referer || parsed.origin
      }
    }, (proxyRes) => {
      let chunks = [];
      proxyRes.on('data', chunk => chunks.push(chunk));
      proxyRes.on('end', () => {
        let html = Buffer.concat(chunks).toString('utf-8');
        const baseTag = `<base href="${parsed.origin}/"><meta name="referrer" content="unsafe-url">`;
        if (html.includes('<head>')) {
          html = html.replace('<head>', '<head>' + baseTag);
        } else {
          html = baseTag + html;
        }

        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
      });
    });

    proxyReq.on('error', err => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Proxy Error: ' + err.message);
    });

    return proxyReq.end();
  }

  res.writeHead(404).end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[OK] VietStream Hub Open Engine dang chay tai: http://localhost:${PORT}`);
});
