import { createStore } from 'vuex';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});
 
let loggedIn = false;
let user = sessionStorage.getItem('userTokens');
let userInfos = localStorage.getItem('userInfos');
if (!user) {
  user = JSON.stringify({});
} else {
  instance.defaults.headers.common['Authorization'] = JSON.parse(user).access_token;
  loggedIn = true;
}
if (!userInfos) {
  userInfos = JSON.stringify({});
}

const store = createStore({
  state: {
    loggedIn: loggedIn,
    status: '',
    user: JSON.parse(user),
    userInfos: JSON.parse(userInfos),
  },
  getters: {},
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.userTokens.access_token;
      sessionStorage.setItem('userTokens', JSON.stringify(user.userTokens));
      localStorage.setItem('userInfos', JSON.stringify(user.userInfos));
      state.user = user.userTokens;
      state.userInfos = user.userInfos;
      state.loggedIn = true;
    },
    logout: function (state) {
      state.user = {};
      state.userInfos = {};
      state.loggedIn = false;
      sessionStorage.removeItem('userTokens');
      localStorage.removeItem('userInfos');
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance
          .post('users/login', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance
          .put('users/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },
    refresh: (refreshToken) => {
      return new Promise((resolve, reject) => {
        instance
          .post('users/refresh', refreshToken)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        instance
          .get('users/accounts')
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
  modules: {},
});

export default store;
