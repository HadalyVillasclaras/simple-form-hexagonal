export class Email {
	private email: string;

	constructor(email: string) {
		this.isDefined(email);
		this.validateEmail(email);
		this.email = email;
	}

	private isDefined(password: string | null | undefined) {
    if (password === '' || password === null || password === undefined) {
      throw new Error("This field cannot be empty");
    }
  }

	private validateEmail(email: string): void {
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}
	}

	value(): string {
		return this.email;
	}

  toJSON(): string {
    return this.email;
  }
}
