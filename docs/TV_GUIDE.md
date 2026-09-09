# Hướng Dẫn Cài Đặt Trên Android TV / Google TV / Fire TV

Cấu hình xem phim, anime và bóng đá trực tiếp không quảng cáo trên màn hình lớn.

---

## 1. Cài đặt Stremio TV (Khuyên Dùng)

Stremio có giao diện tối ưu 100% cho remote TV điều khiển từ xa.

### Bước 1: Tải ứng dụng
- Mở **Google Play Store** trên TV → Tìm kiếm `Stremio` → Bấm **Cài đặt**.
- Nếu TV không có CH Play (Fire TV / Box nội địa), dùng app **Downloader** nhập mã hoặc tải trực tiếp APK từ:
  ```text
  https://www.stremio.com/downloads
  (Chọn bản Stremio Android TV ARM APK)
  ```

### Bước 2: Đồng bộ Addon 1-Click
1. Mở Stremio trên điện thoại hoặc PC, đăng nhập tài khoản Stremio của bạn.
2. Cài đặt Addon của `viet-stream-hub` bằng liên kết:
   ```text
   stremio://raw.githubusercontent.com/viet-stream/hub/main/stremio/manifest.json
   ```
3. Mở Stremio trên Android TV → Đăng nhập cùng tài khoản.
4. Toàn bộ nguồn phim Việt, Thể thao và Anime sẽ tự động xuất hiện trên TV mà không cần gõ bàn phím remote.

---

## 2. Cài đặt Cloudstream 3 trên Android TV

### Bước 1: Cài đặt APK
1. Cài app **Downloader** từ Google Play Store.
2. Nhập URL tải Cloudstream pre-release:
   ```text
   https://github.com/recloudstream/cloudstream/releases/download/pre-release/Cloudstream-Pre-Release.apk
   ```
3. Cài đặt và cấp quyền lưu trữ.

### Bước 2: Thêm Repo
1. Mở Cloudstream → Vào **Settings (Cài đặt)** → **Extensions (Tiện ích)**.
2. Chọn **Add Repository**.
3. Nhập:
   - **Repository Name**: `Viet Stream Hub`
   - **Repository URL**: `https://raw.githubusercontent.com/viet-stream/hub/main/cloudstream/repo.json`
4. Bấm **Download Plugins** → Bật toàn bộ các plugin: KKPhim, NguonC, ThapcamTV.
