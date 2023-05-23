import UserRepository from '../Infrastructure/UserRepository.js';

export default class SignUpService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.target);
        const response = await this.userRepository.addUser(formData);
        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
  }
}

