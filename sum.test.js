const sum = (a, b) => a + b;

test('Kiểm tra hàm tính toán cơ bản của hệ thống', () => {
    expect(sum(1, 2)).toBe(3);
});