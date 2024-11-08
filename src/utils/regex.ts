/**
 * @description Validate email address
 * @param email
 * @returns
 * @example
 * xxx@gmail.com
 */
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

/**
 * @description Validate password: at least 8 characters, at least one letter and one number
 * @param password
 * @returns
 */
export function validatePassword(password: string): boolean {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}
