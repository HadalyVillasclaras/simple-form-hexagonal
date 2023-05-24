export class Email {
	private email: string;

	constructor(email: string) {
		this.validateEmail(email);
		this.email = email;
		console.log(email);
	}

	private validateEmail(email: string): void {
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}
	}

	getEmail(): string {
		return this.email;
	}

  toJSON(): string {
    return this.email;
  }
}
