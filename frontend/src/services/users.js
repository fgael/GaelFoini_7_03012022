import { instance } from '@/helpers/interceptor';

const API_URL = "/users/accounts/";

class userServices {
  getAllUsers() {
    return instance.get(API_URL + "");
  }

  getUsersById(id) {
    return instance.get(API_URL + id);
  }

  deleteUserById(id) {
    return instance.delete(API_URL + id);
  }
  
  // trashUserById(id) {
  //   return instance.delete(API_URL + "trash/" + id);
  // }
}

export default new userServices();