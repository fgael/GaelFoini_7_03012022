import { instance } from '@/helpers/interceptor';

const API_URL = "/users/accounts/";

class UserService {
  getAllUsers() {
    return instance.get(API_URL + "");
  }

  getUsersById(id) {
    return instance.get(API_URL + id);
  }

  deleteUsersById(id) {
    return instance.delete(API_URL + id);
  }
}

export default new UserService();