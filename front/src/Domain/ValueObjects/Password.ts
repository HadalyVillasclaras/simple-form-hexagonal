export class Password {
  private password: string;

  constructor(password: string) {
    this.validatePassword(password);
    this.isDefined(password);
    this.password = password;
  }

  private isDefined(password: string | null | undefined) {
    if (password === '' || password === null || password === undefined) {
      console.log('object');
      throw new Error("This field cannot be empty");
    }
  }

  private validatePassword(password: string) {
    const hasNumber = /\d/;
    const hasCap = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const length = password.length >= 6 && password.length <= 20;

    if (!length) {
      throw new Error("Password must be between 6 and 20 characters");
    }
    if (!hasNumber.test(password)) {
      throw new Error("Password must contain at least one number");
    }
    if (!hasCap.test(password)) {
      throw new Error("Password must contain at least one capital letter");
    }
    if (!hasSymbol.test(password)) {
      throw new Error("Password must contain at least one symbol");
    }
  }

  value(): string {
    return this.password;
  }

  toJSON(): string {
    return this.password;
  }
}
