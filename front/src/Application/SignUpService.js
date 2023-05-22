import UserRepository from '../Infrastructure/UserRepository.js';

export default class SignUpService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(event) {
    event.preventDefault();

    try {
        const formData = new FormData(event.target);
        console.log(formData);
        const response = await this.userRepository.addUser(formData);
        return response;
    } catch (error) {
        console.error('Error in signUp:', error);
        throw error;
    }
  }
}

