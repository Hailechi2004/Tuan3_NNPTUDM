# Product Dashboard - Tuần 3 NNPTUDM

## Mô tả

Dashboard hiển thị danh sách sản phẩm từ API với đầy đủ các chức năng tìm kiếm, sắp xếp và phân trang.

## API sử dụng

- **URL**: https://api.escuelajs.co/api/v1/products
- **Method**: GET

## Chức năng đã triển khai

### 1. ✅ Hàm getAll()

- Lấy tất cả sản phẩm từ API
- Xử lý lỗi khi không thể kết nối API
- Hiển thị loading state

### 2. ✅ CSS cho bảng

- Dòng lẻ: màu đen (background: #000000)
- Dòng chẵn: màu trắng (background: #ffffff)
- Hiển thị đầy đủ hình ảnh sản phẩm (100x100px)
- Hover effect để phóng to hình ảnh
- Responsive design với gradient background

### 3. ✅ Tìm kiếm theo title

- Tìm kiếm realtime với onChange
- Không phân biệt chữ hoa/thường
- Tự động reset về trang 1 khi tìm kiếm
- Hiển thị thông báo khi không tìm thấy kết quả

### 4. ✅ Phân trang (Pagination)

- Hiển thị 5, 10, hoặc 20 sản phẩm mỗi trang
- Nút Previous và Next
- Hiển thị số trang với active state
- Thông tin "Hiển thị X - Y của Z sản phẩm"
- Tự động disable nút khi ở trang đầu/cuối

### 5. ✅ Sắp xếp (Sorting)

- **Giá Tăng Dần**: Sắp xếp từ thấp đến cao
- **Giá Giảm Dần**: Sắp xếp từ cao đến thấp
- **Tên A-Z**: Sắp xếp theo tên tăng dần
- **Tên Z-A**: Sắp xếp theo tên giảm dần
- Tự động reset về trang 1 sau khi sắp xếp

## Cấu trúc file

```
Tuan3_NNPTUDM/
├── index.html      # File HTML chính
├── app.js          # File JavaScript chứa logic
└── README.md       # File hướng dẫn
```

## Cách chạy

1. Mở file `index.html` bằng trình duyệt web
2. Không cần cài đặt thêm, chạy trực tiếp

## Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với gradient và animations
- **JavaScript (ES6+)**: Logic xử lý
- **Fetch API**: Lấy dữ liệu từ REST API

## Tính năng nổi bật

- 🎨 Giao diện đẹp mắt với gradient background
- 🔍 Tìm kiếm realtime
- 📄 Phân trang thông minh
- 🔀 Sắp xếp đa chiều
- 🖼️ Hiển thị hình ảnh với hover zoom
- 📱 Responsive design
- ⚡ Performance tối ưu

## Screenshots

(Thêm ảnh chụp màn hình sau khi hoàn thành)

## Tác giả

Tuần 3 - Nhập Môn Phát Triển Ứng Dụng Di Động

## Ngày hoàn thành

31/01/2026
