import { instance } from '@/helpers/interceptor';

const API_URL = "/posts/";

class postServices {
  getAllPosts() {
    return instance.get(API_URL);
  }

  getOnePost(id) {
    return instance.get(API_URL + id);
  }

  createPost(content) {
      return instance.put(API_URL, content);
  }

  deletePost(id) {
    return instance.delete(API_URL + id);
  }
  
  // trashUserById(id) {
  //   return instance.delete(API_URL + "trash/" + id);
  // }
}

export default new postServices();