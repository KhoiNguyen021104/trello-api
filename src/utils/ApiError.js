/**
 * Định nghĩa riêng một Class ApiError
 * kế thừa class Error sẵn
 * điều này cần thiết và là Best Practice
 * vì class Error nó là class built-in sẵn)
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    // Gọi tới hàm khởi tạo của class Error (class cha)
    // Error có property message
    // => kế thừa lại
    super(message) // <=> Java

    // Tên custom Error,
    // mặc định là "Error"
    this.name = 'ApiError'

    // Gán thêm http status code của chúng ta ở đây
    this.statusCode = statusCode

    // Ghi lại Stack Trace (dấu vết ngăn xếp) => debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
