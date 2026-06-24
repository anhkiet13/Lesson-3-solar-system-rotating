const fs = require('fs');
const path = require('path');

test('QUÉT BẢO MẬT: Kiểm tra giá trị PointLight không được phép thay đổi', () => {
    // Tìm đường dẫn file scripts.js chuẩn xác từ thư mục chạy lệnh (process.cwd())
    const filePath = path.resolve(process.cwd(), 'src', 'js', 'scripts.js');
    
    // Đọc nội dung file
    const codeContent = fs.readFileSync(filePath, 'utf8');

    // REGEX THẦN THÁNH: Bỏ qua mọi khoảng trắng, dấu tab, xuống dòng. 
    // Nó chỉ check xem có đúng cụm THREE.PointLight(0xFFFFFF, hai , ba_trăm) hay không.
    const regexPattern = /THREE\.PointLight\s*\(\s*(0xFFFFFF|0xffffff)\s*,\s*2\s*,\s*300\s*\)/;

    const isValuePreserved = regexPattern.test(codeContent);

    // In log ra màn hình console của Jenkins/Jest nếu tạch để dễ debug
    if (!isValuePreserved) {
        console.log("❌ CẢNH BÁO: Ai đó đã sửa thông số ánh sáng hoặc cấu trúc PointLight trong file scripts.js rồi!");
    }

    expect(isValuePreserved).toBe(true);
});