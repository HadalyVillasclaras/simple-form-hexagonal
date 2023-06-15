import { User } from '../Domain/User';
import { UserRepositoryInterface } from '../Domain/UserRepositoryInterface';
import { Email } from '../Domain/ValueObjects/Email';
import { Password } from '../Domain/ValueObjects/Password';

export default class SignUpService {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async signUp(formData: any): Promise<any> {

      const inputErrors: { field: string, message: string }[] = [];
      const requestData: any = {};
      formData.forEach((value: string, key: string) => {
        if (value === '') {
          inputErrors.push({ field: key, message: 'This field cannot be empty' });
        }
        requestData[key] = value;
      });

      let email: Email;
      let password: Password;
        
      try {
        email = new Email(requestData['email']);
      } catch (error) {
        inputErrors.push({ field: 'email', message: error.message });
      }

      try {
        password = new Password(requestData['password'])
      } catch (error) {
        inputErrors.push({ field: 'password', message: error.message });
      }

      if (inputErrors.length > 0) {
        return { status: 'error', inputErrors: inputErrors };
      }
      try {
        const user: User = {
          surname: requestData['surname'],
          email: new Email(requestData['email']),
          password: new Password(requestData['password']),
        };
  
        const response = await this.userRepository.addUser(user);
        return response;
      } catch (error) {
        console.error(error);
        throw { status: 'error', message: error.message };
      }
  }
}