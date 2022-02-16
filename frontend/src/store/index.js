import { createStore } from 'vuex';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

const instanceRefresh = axios.create({
  baseURL: 'http://localhost:8888',
});

// Mise en place tokens back vers front pour requete
instance.interceptors.request.use(async config => {
  const token = JSON.parse(sessionStorage.getItem('userTokens'));
  if (token) {
    config.headers.Authorization = token.access_token;
  }
  return config;
});


instance.interceptors.response.use(
  (response) => {
    // Suppression tokens si pas de requete pendant duree defini apres expiration access token
    let refreshTime = []
    refreshTime.push((Math.round(+new Date() / 1000)))
    const token = JSON.parse(sessionStorage.getItem('userTokens'));
    if (!token){
      return response;
    } else {
      // duree avant suppression (- 300 = 5min)
        if (refreshTime[refreshTime.length - 2] > (Math.round(+new Date() / 1000) - 300)) {
          return response;
      } else {
        sessionStorage.removeItem('userTokens');
        localStorage.removeItem('userInfos');
        location.reload();
      }
    }
  },
  // Si token expire fonction refreshToken
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

// refreshToken
async function refreshToken() {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = JSON.parse(sessionStorage.getItem('userTokens')).refresh_token;
      const header = {
        Authorization: refresh_token,
      };
      const parameters = {
        method: "POST",
        headers: header,
      };
      const body = {
        grant_type: "refresh_token",
        refresh_token,
      };
      // Recuperation refreshToken
      instanceRefresh
        .post(
          "users/refresh",
          body,
          parameters
        )
        // Mise en place refreshToken
        .then(async (res) => {
          const refresh = JSON.parse(sessionStorage.getItem('userTokens'))
          refresh.access_token = res.data.token;
          sessionStorage.setItem('userTokens', JSON.stringify(refresh));
          // return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    } catch (err) {
      return reject(err);
    }
  })
}

let loggedIn = false;
let user = sessionStorage.getItem('userTokens');
let userInfos = localStorage.getItem('userInfos');
if (!user) {
  user = JSON.stringify({});
} else {
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
