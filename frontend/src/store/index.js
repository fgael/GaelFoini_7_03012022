import { createStore } from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8888'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    access_token: '',
    refresh_token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.userTokens.access_token;
  } catch (ex) {
    user = {
      access_token: '',
      refresh_token: '',
    };
  }
}


const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      id: '',
      nom: '',
      prenom: '',
      pseudo: '',
      email: '',
      role: '',
    },
  },
  getters: {
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.userTokens.access_token;
      localStorage.setItem('user', JSON.stringify(user.userTokens));
      state.user = user.userTokens;
      state.userInfos = user.userInfos;
    },
    logout: function (state) {
      state.user = {
        access_token: '',
        refresh_token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('users/login' , userInfos)
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
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.put('users/signup' , userInfos)
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
  },
  modules: {
  }
})

export default store;