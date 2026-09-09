// ponytail: web player mã nguồn mở Artplayer + Hls.js hỗ trợ đa phân giải, đa âm thanh và nạp phụ đề rời.
const http = require('http');
const { URL } = require('url');

const PORT = 3333;

const PLAYLIST = {
  gioi_mon_chi_ha: {
    title: "Giới Môn Chi Hạ (13 Tập - yanhh3d)",
    episodes: [
      { name: "Tập 1", url: "https://v7.kkphimplayer7.com/20260805/5qkXPUrI/index.m3u8" },
      { name: "Tập 2", url: "https://v7.kkphimplayer7.com/20260805/ecMyxpXf/index.m3u8" },
      { name: "Tập 3", url: "https://v7.kkphimplayer7.com/20260805/J0VIfPe9/index.m3u8" },
      { name: "Tập 4", url: "https://v7.kkphimplayer7.com/20260805/9IQXyN2c/index.m3u8" },
      { name: "Tập 5", url: "https://v7.kkphimplayer7.com/20260805/p9ivUkUA/index.m3u8" },
      { name: "Tập 6", url: "https://v7.kkphimplayer7.com/20260810/U1kEl26l/index.m3u8" },
      { name: "Tập 7", url: "https://v7.kkphimplayer7.com/20260811/TKqzlL4n/index.m3u8" },
      { name: "Tập 8", url: "https://v7.kkphimplayer7.com/20260817/2VhFnXDo/index.m3u8" },
      { name: "Tập 9", url: "https://v7.kkphimplayer7.com/20260819/zUXAzTh1/index.m3u8" },
      { name: "Tập 10", url: "https://v7.kkphimplayer7.com/20260824/A4n7heCf/index.m3u8" },
      { name: "Tập 11", url: "https://v7.kkphimplayer7.com/20260826/sLj9H1JQ/index.m3u8" },
      { name: "Tập 12", url: "https://v7.kkphimplayer7.com/20260831/YoesssXj/index.m3u8" },
      { name: "Tập 13", url: "https://v7.kkphimplayer7.com/20260907/1E4LkDvQ/index.m3u8" }
    ]
  },
  gia_thien: {
    title: "Già Thiên (10 Tập - animesub)",
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
    title: "Bạn Gái Thiên Tài (10 Tập)",
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
  demo_multires: {
    title: "Demo Đa Phân Giải / Audio (Tears of Steel)",
    episodes: [
      { name: "Tears of Steel (Multi-Res & Audio)", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
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
  <title>VietStream Hub · Open Engine</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0b0f19; color: #f1f5f9; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    header { background: #111827; padding: 10px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1f2937; gap: 10px; flex-wrap: wrap; }
    .brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; color: #38bdf8; }
    .tabs { display: flex; gap: 6px; }
    .tab-btn { background: #1f2937; color: #94a3b8; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: all .15s; }
    .tab-btn:hover { color: #f1f5f9; background: #374151; }
    .tab-btn.active { background: #0284c7; color: #fff; font-weight: 600; }
    .controls-bar { display: flex; gap: 6px; align-items: center; }
    .custom-input { display: flex; gap: 4px; }
    .custom-input input { width: 220px; background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #f8fafc; font-size: 12px; outline: none; }
    .custom-input button { background: #059669; border: none; border-radius: 6px; color: white; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 600; }
    .sub-btn { background: #475569; border: none; border-radius: 6px; color: white; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 600; }
    .sub-btn:hover { background: #64748b; }
    .main { display: flex; flex: 1; height: calc(100vh - 54px); }
    .sidebar { width: 280px; background: #111827; border-right: 1px solid #1f2937; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
    .sidebar h2 { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; letter-spacing: 0.5px; }
    .ep-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
    .ep-btn { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 8px; border-radius: 6px; text-align: center; cursor: pointer; font-size: 13px; font-weight: 500; transition: all .15s; }
    .ep-btn:hover { background: #334155; color: #fff; }
    .ep-btn.active { background: #0284c7; border-color: #38bdf8; color: #fff; font-weight: 700; box-shadow: 0 0 10px rgba(2,132,199,0.5); }
    .player-container { flex: 1; background: #000; position: relative; display: flex; align-items: center; justify-content: center; }
    #artplayer-view { width: 100%; height: 100%; }
    .quality-note { position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); backdrop-filter: blur(4px); border: 1px solid #334155; color: #38bdf8; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; pointer-events: none; z-index: 20; }
  </style>
</head>
<body>
  <header>
    <div class="brand">VietStream · OpenEngine</div>
    <div class="tabs">
      <button class="tab-btn active" onclick="switchSeries('gioi_mon_chi_ha')">Giới Môn Chi Hạ</button>
      <button class="tab-btn" onclick="switchSeries('gia_thien')">Già Thiên</button>
      <button class="tab-btn" onclick="switchSeries('ban_gai_thien_tai')">Bạn Gái Thiên Tài</button>
      <button class="tab-btn" onclick="switchSeries('demo_multires')">Demo Multi-Res/Audio</button>
    </div>
    <div class="controls-bar">
      <input id="sub-file-input" type="file" accept=".vtt,.srt" style="display:none" onchange="handleSubFile(this)" />
      <button class="sub-btn" onclick="document.getElementById('sub-file-input').click()">+ Nạp Sub Rời (.srt/.vtt)</button>
      <div class="custom-input">
        <input id="custom-url" type="text" placeholder="Dán link m3u8..." />
        <button onclick="playCustomUrl()">Tải Stream</button>
      </div>
    </div>
  </header>
  <div class="main">
    <div class="sidebar">
      <h2 id="series-title">Danh Sách Tập</h2>
      <div id="ep-grid" class="ep-grid"></div>
    </div>
    <div class="player-container">
      <span id="quality-badge" class="quality-note">HLS Engine</span>
      <div id="artplayer-view"></div>
    </div>
  </div>
  <script>
    const playlistData = ${JSON.stringify(PLAYLIST)};
    let currentSeriesKey = 'gioi_mon_chi_ha';
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

              // 1. Tự động nhận diện danh sách độ phân giải (Resolution / Quality Switcher)
              hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
                const levels = hlsInstance.levels;
                const badge = document.getElementById('quality-badge');

                if (levels.length > 1) {
                  badge.innerText = 'Đa phân giải (' + levels.length + ' mức)';
                  const qualityOptions = levels.map((lvl, idx) => ({
                    html: (lvl.height ? lvl.height + 'P' : Math.round(lvl.bitrate / 1000) + 'kbps'),
                    level: idx,
                    default: idx === hlsInstance.currentLevel
                  }));
                  qualityOptions.unshift({
                    html: 'Tự động (Auto)',
                    level: -1,
                    default: true
                  });

                  artInstance.controls.add({
                    name: 'quality',
                    position: 'right',
                    html: 'Chất lượng',
                    selector: qualityOptions,
                    onSelect: function (item) {
                      hlsInstance.currentLevel = item.level;
                      badge.innerText = item.html;
                      artInstance.notice.show = 'Đã đổi chất lượng: ' + item.html;
                      return item.html;
                    }
                  });
                } else if (levels.length === 1) {
                  const resText = (levels[0].height ? levels[0].height + 'P (FHD)' : '1080P (Gốc)');
                  badge.innerText = 'Chất lượng: ' + resText;
                  artInstance.controls.add({
                    name: 'quality',
                    position: 'right',
                    html: '<span style="background:#0284c7;color:#fff;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:700;">' + resText + '</span>',
                    tooltip: 'Nguồn CDN cố định: ' + resText
                  });
                }
              });

              // 2. Nhận diện các luồng âm thanh rời (Audio Tracks: Lồng tiếng / Thuyết minh / Tiếng gốc)
              hlsInstance.on(Hls.Events.AUDIO_TRACKS_UPDATED, function () {
                const tracks = hlsInstance.audioTracks;
                if (tracks.length > 1) {
                  const audioOpts = tracks.map((t, idx) => ({
                    html: t.name || ('Audio ' + (idx + 1) + (t.lang ? ' [' + t.lang + ']' : '')),
                    level: idx,
                    default: idx === hlsInstance.audioTrack
                  }));
                  artInstance.controls.add({
                    name: 'audio',
                    position: 'right',
                    html: 'Âm thanh',
                    selector: audioOpts,
                    onSelect: function (item) {
                      hlsInstance.audioTrack = item.level;
                      artInstance.notice.show = 'Đã đổi âm thanh: ' + item.html;
                      return item.html;
                    }
                  });
                }
              });

              // 3. Nhận diện phụ đề mềm từ luồng (HLS Subtitle Tracks)
              hlsInstance.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function () {
                const subs = hlsInstance.subtitleTracks;
                if (subs.length > 0) {
                  const subOpts = subs.map((s, idx) => ({
                    html: s.name || ('Phụ đề ' + (idx + 1) + (s.lang ? ' [' + s.lang + ']' : '')),
                    level: idx,
                    default: idx === hlsInstance.subtitleTrack
                  }));
                  subOpts.unshift({ html: 'Tắt phụ đề mềm', level: -1, default: hlsInstance.subtitleTrack === -1 });
                  artInstance.controls.add({
                    name: 'subtitle',
                    position: 'right',
                    html: 'Phụ đề',
                    selector: subOpts,
                    onSelect: function (item) {
                      hlsInstance.subtitleTrack = item.level;
                      artInstance.notice.show = 'Phụ đề: ' + item.html;
                      return item.html;
                    }
                  });
                }
              });

            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = src;
            }
          }
        },
        subtitle: {
          url: '',
          type: 'vtt',
          style: {
            color: '#fff',
            fontSize: '22px',
            textShadow: '0 0 4px #000, 0 0 4px #000'
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

    function handleSubFile(input) {
      if (!input.files || !input.files[0]) return;
      const file = input.files[0];
      const objectUrl = URL.createObjectURL(file);
      const isSrt = file.name.toLowerCase().endsWith('.srt');

      if (artInstance) {
        artInstance.subtitle.switch(objectUrl, {
          name: file.name,
          type: isSrt ? 'srt' : 'vtt'
        });
        artInstance.subtitle.show = true;
        artInstance.notice.show = 'Đã nạp phụ đề: ' + file.name;
      }
    }

    function switchSeries(key) {
      currentSeriesKey = key;
      document.querySelectorAll('.tab-btn').forEach((b, i) => {
        b.classList.toggle('active', 
          (i === 0 && key === 'gioi_mon_chi_ha') ||
          (i === 1 && key === 'gia_thien') ||
          (i === 2 && key === 'ban_gai_thien_tai') ||
          (i === 3 && key === 'demo_multires')
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
      initArtplayer(ep.url);
    }

    function playCustomUrl() {
      const url = document.getElementById('custom-url').value.trim();
      if (!url) return;
      initArtplayer(url);
    }

    switchSeries('gioi_mon_chi_ha');
  </script>
</body>
</html>`);
  }

  res.writeHead(404).end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[OK] VietStream Hub Open Engine dang chay tai: http://localhost:${PORT}`);
});
