class AppError extends Error {
  constructor(type, message = undefined, detail = undefined) {
    super(message);
    (this.type = type), (this.name = this.type.name);
    this.detail = detail;
  }
}

module.exports = AppError;
