// ponytail: web player mã nguồn mở Artplayer + Hls.js tối ưu Web, Mobile, Tablet, Android TV.
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>VietStream Hub · Open Universal Player</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0b0f19; color: #f1f5f9; display: flex; flex-direction: column; height: 100vh; height: 100dvh; overflow: hidden; }
    header { background: #111827; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1f2937; gap: 8px; flex-wrap: wrap; z-index: 30; }
    .brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #38bdf8; white-space: nowrap; }
    .tabs { display: flex; gap: 4px; overflow-x: auto; max-width: 100%; padding-bottom: 2px; }
    .tab-btn { background: #1f2937; color: #94a3b8; border: 1px solid transparent; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; white-space: nowrap; transition: all .15s; }
    .tab-btn:hover, .tab-btn:focus { color: #f1f5f9; background: #374151; outline: 2px solid #38bdf8; }
    .tab-btn.active { background: #0284c7; color: #fff; font-weight: 600; }
    .controls-bar { display: flex; gap: 6px; align-items: center; }
    .custom-input { display: flex; gap: 4px; }
    .custom-input input { width: 180px; background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 5px 8px; color: #f8fafc; font-size: 11px; outline: none; }
    .custom-input button, .sub-btn { background: #0284c7; border: none; border-radius: 6px; color: white; padding: 5px 10px; font-size: 11px; cursor: pointer; font-weight: 600; white-space: nowrap; }
    .sub-btn { background: #475569; }
    .sub-btn:hover, .sub-btn:focus { background: #64748b; outline: 2px solid #38bdf8; }

    /* Layout Responsive: Desktop vs Mobile/Tablet */
    .main { display: flex; flex: 1; height: calc(100vh - 50px); height: calc(100dvh - 50px); overflow: hidden; }
    .sidebar { width: 260px; background: #111827; border-right: 1px solid #1f2937; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
    .sidebar h2 { font-size: 11px; text-transform: uppercase; color: #64748b; margin-bottom: 6px; letter-spacing: 0.5px; }
    .ep-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
    .ep-btn { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 8px; border-radius: 6px; text-align: center; cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; }
    .ep-btn:hover, .ep-btn:focus { background: #334155; color: #fff; outline: 2px solid #38bdf8; }
    .ep-btn.active { background: #0284c7; border-color: #38bdf8; color: #fff; font-weight: 700; box-shadow: 0 0 10px rgba(2,132,199,0.5); }
    .player-container { flex: 1; background: #000; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    #artplayer-view { width: 100%; height: 100%; }
    .quality-note { position: absolute; top: 10px; right: 10px; background: rgba(15,23,42,0.85); backdrop-filter: blur(4px); border: 1px solid #334155; color: #38bdf8; padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-weight: 600; pointer-events: none; z-index: 20; }

    /* Giao diện Mobile / Tablet dọc */
    @media (max-width: 768px) {
      .main { flex-direction: column; }
      .player-container { width: 100%; height: 38vh; min-height: 220px; flex: none; }
      .sidebar { width: 100%; flex: 1; border-right: none; border-top: 1px solid #1f2937; }
      .ep-grid { grid-template-columns: repeat(4, 1fr); }
      .custom-input input { width: 120px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">VietStream · Universal</div>
    <div class="tabs" id="tabs-list">
      <button class="tab-btn active" tabindex="0" onclick="switchSeries('gioi_mon_chi_ha')">Giới Môn Chi Hạ</button>
      <button class="tab-btn" tabindex="0" onclick="switchSeries('gia_thien')">Già Thiên</button>
      <button class="tab-btn" tabindex="0" onclick="switchSeries('ban_gai_thien_tai')">Bạn Gái Thiên Tài</button>
      <button class="tab-btn" tabindex="0" onclick="switchSeries('demo_multires')">Demo Multi-Res/Audio</button>
    </div>
    <div class="controls-bar">
      <input id="sub-file-input" type="file" accept=".vtt,.srt" style="display:none" onchange="handleSubFile(this)" />
      <button class="sub-btn" tabindex="0" onclick="document.getElementById('sub-file-input').click()">+ Sub Rời</button>
      <div class="custom-input">
        <input id="custom-url" type="text" placeholder="Dán link m3u8..." />
        <button tabindex="0" onclick="playCustomUrl()">Tải</button>
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

              // 1. Phân giải (Resolution)
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
                      artInstance.notice.show = 'Chất lượng: ' + item.html;
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

              // 2. Âm thanh (Audio Tracks)
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
                      artInstance.notice.show = 'Âm thanh: ' + item.html;
                      return item.html;
                    }
                  });
                }
              });

              // 3. Phụ đề mềm (Subtitles)
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
              // Hỗ trợ native cho Apple Safari trên iOS / iPadOS / macOS
              video.src = src;
            }
          }
        },
        subtitle: {
          url: '',
          type: 'vtt',
          style: {
            color: '#fff',
            fontSize: '20px',
            textShadow: '0 0 4px #000, 0 0 4px #000'
          }
        },
        autoplay: true,
        autoSize: true,
        autoOrientation: true, // Tự xoay ngang toàn màn hình trên điện thoại / tablet
        lock: true,            // Khóa màn hình cảm ứng chống bấm nhầm trên mobile
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
        btn.tabIndex = 0;
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

    // Hỗ trợ phím điều khiển Android TV Remote D-Pad
    window.addEventListener('keydown', (e) => {
      const code = e.keyCode || e.which;
      if (!artInstance) return;

      // 19: UP, 20: DOWN, 21: LEFT, 22: RIGHT, 23/66/13: CENTER/ENTER, 85/126: PLAY_PAUSE
      if (code === 21) {
        artInstance.seek = Math.max(0, artInstance.currentTime - 10);
        artInstance.notice.show = 'Tua lùi -10s';
      } else if (code === 22) {
        artInstance.seek = Math.min(artInstance.duration, artInstance.currentTime + 10);
        artInstance.notice.show = 'Tua tiến +10s';
      } else if (code === 19) {
        artInstance.volume = Math.min(1, artInstance.volume + 0.1);
        artInstance.notice.show = 'Âm lượng: ' + Math.round(artInstance.volume * 100) + '%';
      } else if (code === 20) {
        artInstance.volume = Math.max(0, artInstance.volume - 0.1);
        artInstance.notice.show = 'Âm lượng: ' + Math.round(artInstance.volume * 100) + '%';
      } else if (code === 23 || code === 85 || code === 126) {
        artInstance.toggle();
      }
    });

    switchSeries('gioi_mon_chi_ha');
  </script>
</body>
</html>`);
  }

  res.writeHead(404).end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[OK] VietStream Hub Universal dang chay tai: http://localhost:${PORT}`);
});
