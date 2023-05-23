import { API_BASE_URL } from '../../config.js';

export default class UserRepository {

  async addUser(userData) {
    try {
      const response = await fetch(API_BASE_URL + 'SignUpController.php', {
        method: 'POST',
        body: userData
      });

      return response;

    } catch (error) {
      console.error(error);
    }
  }

  async getUserByEmail() {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}