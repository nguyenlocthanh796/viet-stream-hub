// ponytail: web player nhúng cục bộ giả lập Referer; nâng cấp WebSocket nếu làm phòng xem chung.
const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3333;

const PLAYLIST = {
  yanhh3d: {
    title: "Giới Môn Chi Hạ (yanhh3d.ee)",
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
  },
  animesub: {
    title: "Già Thiên (animesub.site)",
    referer: "https://animesub.site/",
    episodes: [
      { name: "Tập 171", url: "https://api.anime3s.com/ApiOk.php?v=Jm29_16lB&show=0" },
      { name: "Tập 172", url: "https://api.anime3s.com/ApiOk.php?v=qUTPmhlBd&show=0" },
      { name: "Tập 173", url: "https://api.anime3s.com/ApiOk.php?v=3YrBd_Y4D&show=0" },
      { name: "Tập 174", url: "https://api.anime3s.com/ApiOk.php?v=jsz11jGC6&show=0" },
      { name: "Tập 175", url: "https://api.anime3s.com/ApiOk.php?v=H-A8HIJM6&show=0" },
      { name: "Tập 176", url: "https://api.anime3s.com/ApiOk.php?v=Y7mybuieH&show=0" },
      { name: "Tập 177", url: "https://api.anime3s.com/ApiOk.php?v=__pk-q162&show=0" },
      { name: "Tập 178", url: "https://api.anime3s.com/ApiOk.php?v=UzwUWSyHj&show=0" },
      { name: "Tập 179", url: "https://api.anime3s.com/ApiOk.php?v=BfsrjGj6H&show=0" },
      { name: "Tập 180", url: "https://api.anime3s.com/ApiOk.php?v=8rhmrkMP_&show=0" }
    ]
  }
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  // Endpoint 1: Giao diện web xem phim
  if (reqUrl.pathname === '/' || reqUrl.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>VietStream Hub - Player Trực Tiếp</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    header { background: #1e293b; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; }
    header h1 { font-size: 18px; font-weight: 600; color: #38bdf8; }
    .tabs { display: flex; gap: 8px; }
    .tab-btn { background: #334155; color: #cbd5e1; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; }
    .tab-btn.active { background: #0284c7; color: #fff; }
    .main { display: flex; flex: 1; height: calc(100vh - 55px); }
    .sidebar { width: 280px; background: #1e293b; border-right: 1px solid #334155; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
    .sidebar h2 { font-size: 13px; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px; }
    .ep-btn { background: #0f172a; color: #e2e8f0; border: 1px solid #334155; padding: 10px 12px; border-radius: 6px; text-align: left; cursor: pointer; font-size: 14px; transition: all .15s; }
    .ep-btn:hover { background: #334155; }
    .ep-btn.active { background: #0284c7; border-color: #38bdf8; color: #fff; font-weight: 600; }
    .player-area { flex: 1; background: #000; display: flex; flex-direction: column; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>VietStream Hub · Player</h1>
    <div class="tabs">
      <button class="tab-btn active" onclick="switchSeries('yanhh3d')">Giới Môn Chi Hạ (10 Tập)</button>
      <button class="tab-btn" onclick="switchSeries('animesub')">Già Thiên (10 Tập)</button>
    </div>
  </header>
  <div class="main">
    <div class="sidebar">
      <h2 id="series-title">Danh sách tập</h2>
      <div id="ep-list" style="display:flex; flex-direction:column; gap:6px;"></div>
    </div>
    <div class="player-area">
      <iframe id="video-frame" allow="fullscreen; autoplay"></iframe>
    </div>
  </div>
  <script>
    const data = ${JSON.stringify(PLAYLIST)};
    let currentKey = 'yanhh3d';

    function switchSeries(key) {
      currentKey = key;
      document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', (i === 0 && key === 'yanhh3d') || (i === 1 && key === 'animesub')));
      document.getElementById('series-title').innerText = data[key].title;
      renderEpisodes();
      selectEpisode(0);
    }

    function renderEpisodes() {
      const container = document.getElementById('ep-list');
      container.innerHTML = '';
      data[currentKey].episodes.forEach((ep, idx) => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn' + (idx === 0 ? ' active' : '');
        btn.innerText = ep.name;
        btn.onclick = () => selectEpisode(idx);
        container.appendChild(btn);
      });
    }

    function selectEpisode(idx) {
      document.querySelectorAll('.ep-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
      const ep = data[currentKey].episodes[idx];
      const proxyUrl = '/embed?url=' + encodeURIComponent(ep.url) + '&ref=' + encodeURIComponent(data[currentKey].referer);
      document.getElementById('video-frame').src = proxyUrl;
    }

    switchSeries('yanhh3d');
  </script>
</body>
</html>`);
  }

  // Endpoint 2: Reverse Proxy tiêm Referer & Base URL
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
        // Tiêm thẻ <base href="..."> để toàn bộ CSS, JS relative của player tải đúng
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
  console.log(`[OK] VietStream Hub Player dang chay tai: http://localhost:${PORT}`);
});
