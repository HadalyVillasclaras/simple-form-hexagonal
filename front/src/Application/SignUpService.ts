import UserRepository from '../Infrastructure/UserRepository';

export default class SignUpService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(event: Event): Promise<any> {
    event.preventDefault();
    try {
        const formData = new FormData(event.target as HTMLFormElement);
        const response = await this.userRepository.addUser(formData);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
  }
}