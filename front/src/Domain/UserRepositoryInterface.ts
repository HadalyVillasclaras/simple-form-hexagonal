import { User } from './User';

export interface UserRepository {
	addUser: (user: User) => Promise<User | undefined>;
	// getUserByEmail: (email: Email) => Promise<User[]>;
}