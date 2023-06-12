import { API_BASE_URL } from '../../config';
import { User } from '../Domain/User';

export default class MysqlUserRepository {

  async addUser(user: User): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignUpController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      return response;

    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }

  async signIn(user: any): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      return response;

    } catch (error) {
      throw { status: 'error', message: (error as Error).message };
    }
  }


  async getUserByEmail(): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'GET'
      });

      return response;
    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }
}
