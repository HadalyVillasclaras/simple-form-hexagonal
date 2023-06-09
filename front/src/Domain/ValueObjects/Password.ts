export class Password {
  private password: string;

  constructor(password: string) {
    this.validatePassword(password);
    this.isDefined(password);
    this.password = password;
  }

  private isDefined(password: string | null | undefined) {
    if (password === '' || password === null || password === undefined) {
      throw new Error("This field cannot be empty");
    }
  }

  private validatePassword(password: string) {
    const hasNumber = /\d/;
    const hasCap = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const length = password.length >= 6 && password.length <= 20;

    if (!length) {
      throw new Error("Length must be greater than 8 characters");
    }
    if (!hasNumber.test(password)) {
      throw new Error("Password must have at least one number");
    }
    if (!hasCap.test(password)) {
      throw new Error("Password must contain uppercase letters");
    }
    if (!hasSymbol.test(password)) {
      throw new Error("Password must have at least one symbol");
    }
  }

  value(): string {
    return this.password;
  }

  toJSON(): string {
    return this.password;
  }
}
