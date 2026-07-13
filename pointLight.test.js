const fs = require('fs');
const path = require('path');

test('QUÉT BẢO MẬT: Kiểm tra giá trị PointLight không được phép thay đổi', () => {
    // 1. Tự động tìm file scripts.js hoặc index.js trong toàn bộ project
    const possiblePaths = [
        path.resolve(process.cwd(), 'src', 'js', 'scripts.js'),
        path.resolve(process.cwd(), 'src', 'scripts.js'),
        path.resolve(process.cwd(), 'src', 'index.js'),
        path.resolve(process.cwd(), 'scripts.js')
    ];

    let filePath = possiblePaths.find(p => fs.existsSync(p));

    if (!filePath) {
        throw new Error("❌ KRITICAL ERROR: Không tìm thấy file scripts.js trong project!");
    }

    // 2. Đọc nội dung file
    const codeContent = fs.readFileSync(filePath, 'utf8');

    // 3. REGEX CẢI TIẾN: Bắt buộc phải có PointLight VÀ phải chứa giá trị cường độ = 2
    // Bắt được cả: new THREE.PointLight(0xFFFFFF, 2, 300) lẫn PointLight(color, 2, 300)
    const hasPointLight = /PointLight/.test(codeContent);
    const hasCorrectIntensity = /PointLight\s*\([^)]*,\s*2\s*[,)]/.test(codeContent) || /intensity\s*=\s*2/.test(codeContent);

    if (!hasPointLight || !hasCorrectIntensity) {
        console.log("❌ CẢNH BÁO: Phát hiện thay đổi thông số PointLight hoặc Cường độ (Intensity != 2)!");
    }

    expect(hasPointLight).toBe(true);
    expect(hasCorrectIntensity).toBe(true);
});