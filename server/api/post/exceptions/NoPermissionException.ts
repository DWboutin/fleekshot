export default class NoPermissionException extends Error {
  constructor(message?: string) {
    if (typeof message === "undefined") {
      message = "Don't have the permission";
    }

    super(message);

    this.message = message;
    this.name = "NoPermission";

    Error.captureStackTrace(this, NoPermissionException);
  }
}
