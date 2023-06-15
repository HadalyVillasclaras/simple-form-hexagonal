import { Email } from "./ValueObjects/Email";
import { Password } from "./ValueObjects/Password";

export interface User {
	email: Email;
	password: Password;
}