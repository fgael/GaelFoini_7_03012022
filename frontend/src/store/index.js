import { createStore } from "vuex";
import { instance } from "@/helpers/interceptor";

let loggedIn = false;
let user = localStorage.getItem("userTokens");
let userInfos = localStorage.getItem("userInfos");
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
    status: "",
    user: JSON.parse(user),
    userInfos: JSON.parse(userInfos),
  },
  getters: {},
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      localStorage.setItem("userTokens", JSON.stringify(user.userTokens));
      localStorage.setItem("userInfos", JSON.stringify(user.userInfos));
      state.user = user.userTokens;
      state.userInfos = user.userInfos;
      state.loggedIn = true;
    },
    logout: function (state) {
      state.user = {};
      state.userInfos = {};
      state.loggedIn = false;
      localStorage.removeItem("userTokens");
      localStorage.removeItem("userInfos");
    },
    userUpdate: function (state, user) {
      localStorage.removeItem("userTokens");
      localStorage.removeItem("userInfos");
      state.user = user.userTokens;
      state.userInfos = user.userInfos;
      localStorage.setItem("userTokens", JSON.stringify(user.userTokens));
      localStorage.setItem("userInfos", JSON.stringify(user.userInfos));
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("users/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .put("users/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    userUpdate: ({ commit }, content) => {
      return new Promise((resolve, reject) => {
        instance
          .patch(`users/accounts/${content.id}`, content.user)
          .then(function (response) {
            commit("userUpdate", response.data);
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