# Ứng dụng Flashcards

Ứng dụng flashcards hiện đại, tối giản, xây bằng Vite + React.

## Công nghệ sử dụng
- Vite (React) cho tốc độ phát triển/build nhanh
- React 18 (hooks)
- CSS thuần, responsive, hỗ trợ sáng/tối
- LocalStorage để lưu dữ liệu cục bộ

## Chức năng
- Quản lý thẻ: thêm, sửa, xóa (lưu vào trình duyệt)
- Chế độ Học: lật thẻ, dùng chung thứ tự xáo trộn
- Chế độ Làm bài:
  - Trắc nghiệm (4 lựa chọn) có thanh tiến độ, kết quả, Làm lại, Ôn câu sai
  - Tự luận (nhập đáp án) chấm ngay, có kết quả, Làm lại, Ôn câu sai
- Chuyển đổi giao diện Sáng/Tối, hiển thị đẹp trên mobile, không tràn giao diện

## Cách chạy
1. Cài đặt phụ thuộc:
```bash
npm install
```
2. Chạy môi trường phát triển:
```bash
npm run dev
```
3. Build sản phẩm:
```bash
npm run build
```
4. Xem thử bản build:
```bash
npm run preview
```

## Cấu trúc chính
- `src/App.jsx`: trạng thái ứng dụng, điều phối chế độ học/thi
- `src/components/CardList.jsx`: CRUD thẻ + chọn hình thức làm bài
- `src/components/StudyMode.jsx`: học bằng lật thẻ
- `src/components/QuizMode.jsx`: làm bài trắc nghiệm
- `src/components/WrittenMode.jsx`: làm bài tự luận
- `src/App.css`: giao diện (biến, theme, responsive)
- `src/index.css`: nền tảng bố cục, ổn định cuộn trang

## Ghi chú
- Dữ liệu thẻ lưu ở LocalStorage key `flashcards`
- Giao diện lưu ở LocalStorage key `theme`
- Dễ tùy biến màu sắc trong `:root` ở `src/App.css`
