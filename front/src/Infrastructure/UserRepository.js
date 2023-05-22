import { API_BASE_URL } from '../../config.js';

export default class UserRepository {

  async addUser(userData) {
    try {
      console.log(userData);
      const response = await fetch(API_BASE_URL + 'SignUpController.php', {
        method: 'POST',
        body: userData
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`${response}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getUserByEmail() {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}