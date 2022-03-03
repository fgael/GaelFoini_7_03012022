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

  updatePost(id, content) {
    return instance.patch(API_URL + id, content);
  }

  deletePost(id) {
    return instance.delete(API_URL + id);
  }

  createComment(content) {
    return instance.put(API_URL + "comment/", content)
  }

  deleteComment(id) {
    return instance.delete(API_URL + "comment/" + id)
  }
  
  // trashUserById(id) {
  //   return instance.delete(API_URL + "trash/" + id);
  // }
}

// Exportation postServices pour route post & comment
export default new postServices();