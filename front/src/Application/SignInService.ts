import { UserRepositoryInterface } from '../Domain/UserRepositoryInterface';
import { User } from '../Domain/User';
import { Email } from '../Domain/ValueObjects/Email';
import { Password } from '../Domain/ValueObjects/Password';

export default class SignInService {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async signIn(formData: any): Promise<any> {
    try {
      const requestData: any = {};
      formData.forEach((value: string, key: number) => {
        if (value === '') {
          throw Error('Front fields cannot be null')
        }
        requestData[key] = value;
      });

      const user: User = {
        email: new Email(requestData['email']),
        password: new Password(requestData['password']),
      };

      const response = await this.userRepository.signIn(user);
      const responseData = await response.json();
      return responseData;

    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }
}