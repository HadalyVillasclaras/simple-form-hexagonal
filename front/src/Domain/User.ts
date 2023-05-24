import { Email } from "./ValueObjects/Email";
import { Password } from "./ValueObjects/Password";

export interface User {
	name?: string;
	surname?: string;
	email: Email;
	password: Password;
}