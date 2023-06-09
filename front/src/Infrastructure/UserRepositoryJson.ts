import * as data from './jsonDB.json'; // assuming the JSON file is named 'user.json' and located in the same directory

export default class UserRepositoryJson {

  async signIn(user: any): Promise<Response> {
    return new Promise((resolve, reject) => {
      const storedUser = data[0];
  
      if (user.email === storedUser.mail && user.password === storedUser.pass) {
        resolve({
          status: 'success',
          message: 'Logged in successfully'
        });
      } else {
        reject({
          status: 'error',
          message: 'Invalid credentials'
        });
      }
    });
  }

}