/**
 * Known error reasons
 */
export enum ErrorReason {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INVALID_EMAIL_PASSWORD = 'INVALID_EMAIL_PASSWORD',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Application specific authentication/authorization errors
 *
 */
export interface AuthError extends Error {
  /**
   *
   * @param reason the reason for the error
   */
  reason: ErrorReason;
  /**
   * The parent error
   */
  cause: any;
}
