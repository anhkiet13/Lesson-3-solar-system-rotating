// src/vulnerable-demo.js

// 🔴 LỖ HỔNG BẢO MẬT 1: Hardcode Mật khẩu / Secret Key trong mã nguồn (Hardcoded Credentials)
const AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLEKeySecret123456789";
const DB_PASSWORD = "admin_password_123456";

// 🔴 LỖ HỔNG BẢO MẬT 2: Sử dụng thuật toán mã hóa yếu đã bị khai tử (Weak Cryptography)
const crypto = require('crypto');
function getMD5Hash(data) {
    // MD5 bị coi là lỗ hổng bảo mật nghiêm trọng (Vulnerability) trên SonarQube
    return crypto.createHash('md5').update(data).digest('hex'); 
}

// 🟠 CODE SMELL & BUGS: Code thừa vãi thãi, biến rác, vòng lặp vô tận
function badCodePractice() {
    let unusedVar = 100; // Unused variable
    
    if (true) {
        // Condition is always true
        console.log("Hardcoded condition");
    }
    
    // So sánh sai kiểu dữ liệu
    if (a = b) { // Assignment in conditional expression
        console.log("Bug logic");
    }
}

module.exports = { getMD5Hash, badCodePractice };