export class UserIsAlreadyActiveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserIsAlreadyActiveError";
    Object.setPrototypeOf(this, UserIsAlreadyActiveError.prototype);
  }
}
export class UserDoesntExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDoesntExistError";
    Object.setPrototypeOf(this, UserDoesntExistError.prototype);
  }
}
