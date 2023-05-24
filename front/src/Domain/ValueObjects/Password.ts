export class Password {
  private password: string;

  constructor(password: string) {
    this.validatePassword(password);
    this.password = password;
  }

  private validatePassword(password: string) {
    const hasNumber = /\d/;
    const hasCap = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const length = password.length >= 6 && password.length <= 8;

    if (!hasNumber.test(password)) {
      throw new Error("Password must contain at least one number.");
    }
    if (!hasCap.test(password)) {
      throw new Error("Password must contain at least one capital letter.");
    }
    if (!hasSymbol.test(password)) {
      throw new Error("Password must contain at least one symbol.");
    }
    if (!length) {
      throw new Error("Password must be between 6 and 8 characters.");
    }
  }

  getPassword(): string {
    return this.password;
  }

  toJSON(): string {
    return this.password;
  }
}
