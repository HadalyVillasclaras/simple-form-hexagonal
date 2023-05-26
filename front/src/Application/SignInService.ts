import { UserRepositoryInterface } from '../Domain/UserRepositoryInterface';
import { Email } from '../Domain/ValueObjects/Email';
import { SignInError } from '../Domain/Exceptions/SignInException';

export default class SignInService {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async signIn(formData: any): Promise<any> {
    const errors: { field: string, message: string }[] = [];
    const requestData: any = {};

    formData.forEach((value: string, key: any) => {
      if (value === '') {
        errors.push({ field: key, message: 'This field cannot be empty.' });
      }
      requestData[key] = value;
    });

    let email: Email;

    try {
      email = new Email(requestData['email']);
    } catch (error) {
      errors.push({ field: 'email', message: error.message });
    }

    if (errors.length > 0) {
      return { status: 'error', errors };
    }

    try {
      const loginUser = {
        email: requestData['email'],
        password: requestData['password'],
      };
      const response = await this.userRepository.signIn(loginUser);
      return response;
    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }
}