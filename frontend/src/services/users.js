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

  updateRole(id, content) {
    return instance.patch(API_URL + "role/" + id, content)
  }
  
  // trashUserById(id) {
  //   return instance.delete(API_URL + "trash/" + id);
  // }
}

// exportation userServices pour route user
export default new userServices();