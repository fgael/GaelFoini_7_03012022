import { createStore } from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8888'
});

const store = createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('users/login' , userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },    
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.put('users/signup' , userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    }
  },
  modules: {
  }
})

export default store;