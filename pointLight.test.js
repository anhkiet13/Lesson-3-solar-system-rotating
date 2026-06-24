const fs = require('fs');
const path = require('path');

test('QUÉT BẢO MẬT: Kiểm tra giá trị PointLight không được phép thay đổi', () => {
    // 1. Chỉ định đường dẫn tới file chứa code Three.js của bro (Giả định là src/js/scripts.js)
    // Nếu file của bro tên khác hoặc nằm chỗ khác, hãy sửa lại đoạn 'src', 'js', 'scripts.js' này nhé
    const filePath = path.join(__dirname, 'src', 'js', 'scripts.js');
    
    // 2. Đọc toàn bộ nội dung file code thành dạng chuỗi văn bản (String)
    const codeContent = fs.readFileSync(filePath, 'utf8');

    // 3. Định nghĩa chuỗi chuẩn bắt buộc phải có trong code
    const expectedCode = 'const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);';

    // 4. Kiểm tra xem trong file có chứa chính xác cụm từ này hay không
    const isValuePreserved = codeContent.includes(expectedCode);

    // 5. Nếu không tìm thấy (tức là có ai đó đã sửa số 2 hoặc số 300), Jest sẽ bẻ gãy test và báo lỗi
    expect(isValuePreserved).toBe(true);
});