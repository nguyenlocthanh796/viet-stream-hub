# Hướng Dẫn Cài Đặt Trên Mobile (Android & iOS)

Xem phim, anime, thể thao HD mượt mà, không quảng cáo trên smartphone và tablet.

---

## 1. Dành cho Android (Điện thoại & Tablet)

### Cách A: Cloudstream 3 (Trải nghiệm tốt nhất)
1. Tải APK mới nhất:
   [Cloudstream Pre-Release APK](https://github.com/recloudstream/cloudstream/releases/download/pre-release/Cloudstream-Pre-Release.apk)
2. Mở ứng dụng → Chọn **Cài đặt** (biểu tượng bánh răng) → **Tiện ích** (Extensions).
3. Bấm **Thêm kho lưu trữ** (Add Repository) và dán URL:
   ```text
   https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/cloudstream/repo.json
   ```
4. Chọn danh sách plugin tiếng Việt muốn sử dụng và bấm **Cài đặt**.

### Cách B: Stremio Android
1. Cài đặt Stremio từ [Google Play Store](https://play.google.com/store/apps/details?id=com.stremio.one).
2. Nhấp vào liên kết 1-Click:
   ```text
   stremio://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json
   ```
3. Bấm **Install** khi ứng dụng hỏi xác nhận.

---

## 2. Dành cho iOS (iPhone & iPad)

Hệ sinh thái Apple có giới hạn nghiêm ngặt với sideloading, giải pháp khuyên dùng là Stremio Web kết hợp trình phát ngoài.

### Cách thiết lập Stremio Web trên iOS:
1. Mở trình duyệt Safari trên iPhone/iPad.
2. Truy cập: `https://web.stremio.com`
3. Bấm nút **Chia sẻ (Share)** ở Safari → Chọn **Thêm vào MH chính (Add to Home Screen)** để tạo app độc lập.
4. Tải ứng dụng **VLC** hoặc **Outplayer** từ App Store để làm trình phát video bên ngoài (External Player).
5. Trong cài đặt Stremio Web:
   - Vào **Settings** → **Streaming** → Bật **Always start with external player** (chọn VLC hoặc Outplayer).
6. Cài Addon `viet-stream-hub` bằng cách dán URL manifest vào ô tìm kiếm addon:
   ```text
   https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json
   ```
