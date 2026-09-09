# viet-stream-hub 🇻🇳🍿

> **Cổng phát trực tuyến 1-Click cho cộng đồng người Việt.** Phim điện ảnh, truyền hình, anime và bóng đá trực tiếp không quảng cáo trên Cloudstream 3, Stremio, Android TV, Mobile và PC.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI Validation](https://img.shields.io/badge/CI-Passing-brightgreen.svg)]()
[![Platform: Cross-Platform](https://img.shields.io/badge/Platform-Android%20TV%20%7C%20Mobile%20%7C%20PC-orange.svg)]()
[![Cloudstream Repo](https://img.shields.io/badge/Cloudstream-v3%20Repo-purple.svg)](cloudstream/repo.json)
[![Stremio Addon](https://img.shields.io/badge/Stremio-Addon%20Ready-blueviolet.svg)](stremio/manifest.json)

---

## ⚡ Tính Năng Nổi Bật

- 🚫 **100% Không Quảng Cáo**: Bỏ qua toàn bộ banner, popup, và chuyển hướng rác từ các web lậu thông thường.
- 📺 **Đa Nền Tảng**: Hoạt động mượt mà trên **Android TV / Google TV**, điện thoại Android, iOS, Windows, macOS, Linux.
- ⚡ **1-Click Setup**: Thêm toàn bộ kho phim & kênh trực tiếp bằng 1 cú nhấp chuột hoặc lệnh duy nhất.
- 🔄 **Nguồn Mở & Tự Động Giám Sát**: Tích hợp GitHub Actions định kỳ kiểm tra tình trạng API và độ trễ từng máy chủ (KKPhim, NguonC, AnimeVietsub, ThapcamTV).
- 🛡️ **Tuân Thủ Pháp Lý**: Dự án chỉ lập chỉ mục (index/metadata) và giao thức mở, không lưu trữ hay truyền tải trực tiếp bất kỳ tệp media vi phạm bản quyền nào trên GitHub.

---

## 🚀 Cài Đặt Nhanh (1-Click)

### 1. Windows PC (1-Click Setup)
Mở PowerShell và chạy lệnh sau để tự động tải cấu hình & đăng ký Stremio:
```powershell
irm https://raw.githubusercontent.com/viet-stream/hub/main/scripts/setup.ps1 | iex
```

### 2. macOS / Linux / Android Termux
Mở Terminal và chạy:
```bash
curl -fsSL https://raw.githubusercontent.com/viet-stream/hub/main/scripts/setup.sh | bash
```

### 3. Cloudstream 3 (Android & Android TV)
1. Cài đặt [Cloudstream 3 APK](https://github.com/recloudstream/cloudstream/releases/download/pre-release/Cloudstream-Pre-Release.apk).
2. Mở ứng dụng → **Cài đặt** → **Tiện ích** → **Thêm kho lưu trữ**.
3. Dán URL sau:
   ```text
   https://raw.githubusercontent.com/viet-stream/hub/main/cloudstream/repo.json
   ```
4. Bấm tải các tiện ích bạn muốn dùng.

### 4. Stremio (Mọi thiết bị)
Bấm trực tiếp vào đường link sau nếu thiết bị đã cài Stremio:
👉 [**Cài đặt Stremio Addon (viet-stream-hub)**](stremio://raw.githubusercontent.com/viet-stream/hub/main/stremio/manifest.json)

---

## 📖 Hướng Dẫn Chi Tiết

- 📺 [**Hướng dẫn cài đặt trên Android TV / Fire TV**](docs/TV_GUIDE.md)
- 📱 [**Hướng dẫn cài đặt trên Mobile (Android & iOS)**](docs/MOBILE_GUIDE.md)

---

## 📡 Danh Sách Nhà Cung Cấp Đang Hoạt Động

| Nhà cung cấp | Danh mục | Giao thức | Tình trạng |
| :--- | :--- | :--- | :--- |
| **KKPhim** | Phim chiếu rạp, Phim bộ, Phim lẻ | REST API / HLS m3u8 | 🟢 Hoạt động |
| **NguonC** | Phim bộ cập nhật nhanh, Vietsub / Thuyết minh | REST API / HLS m3u8 | 🟢 Hoạt động |
| **AnimeVietsub** | Hoạt hình Nhật Bản, Phim Anime mới | Scraper / Direct HLS | 🟢 Hoạt động |
| **ThapcamTV** | Trực tiếp bóng đá Ngoại Hạng Anh, C1, V-League | M3U / Web Livestream | 🟢 Hoạt động |

---

## ⚖️ Tuyên Bố Pháp Lý (Disclaimer & DMCA)

1. **Bản quyền & Lưu trữ**: `viet-stream-hub` là dự án mã nguồn mở nhằm nghiên cứu công nghệ và lập chỉ mục metadata công khai. Kho lưu trữ này **hoàn toàn KHÔNG lưu trữ, tải lên hoặc phát tán bất kỳ tệp video, âm thanh hay hình ảnh có bản quyền nào**.
2. **Nguồn dữ liệu**: Tất cả các đường dẫn phát sóng trực tuyến đều do cộng đồng đóng góp và thu thập từ các API/web công cộng của bên thứ ba trên Internet. Người dùng tự chịu trách nhiệm về nội dung phát và luật bản quyền sở tại.
3. **Quy trình gỡ bỏ (DMCA Takedown)**: Nếu bạn là chủ sở hữu bản quyền hợp pháp và muốn gỡ bỏ một nguồn chỉ mục cụ thể khỏi repo, vui lòng gửi yêu cầu qua [**DMCA Notice Form**](.github/ISSUE_TEMPLATE/dmca_takedown.yml). Chúng tôi sẽ tiếp nhận và loại bỏ nguồn trong vòng 24-48 giờ.

---

## 🤝 Đóng Góp

Mọi ý tưởng đóng góp hoặc đề xuất thêm nguồn API mới đều được hoan nghênh:
- Báo lỗi nguồn / Yêu cầu nguồn mới: [Tạo Issue](.github/ISSUE_TEMPLATE/source_request.yml)
- Gửi Pull Request: Hãy đảm bảo chạy script kiểm tra nguồn `./scripts/verify-sources.ps1` trước khi mở PR.

License: [MIT](LICENSE)
