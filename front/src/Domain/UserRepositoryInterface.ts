import { User } from './User';

export interface UserRepositoryInterface {
	addUser: (user: User) => Promise<any | undefined>;
	signIn: (user: User) => Promise<any | undefined>;
}