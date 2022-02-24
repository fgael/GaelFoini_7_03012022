import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

const instanceRefresh = axios.create({
  baseURL: 'http://localhost:8888',
});

// Mise en place tokens pour requete
instance.interceptors.request.use(async config => {
const token = JSON.parse(sessionStorage.getItem('userTokens'));
  if (token) {
    config.headers.Authorization = token.access_token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  // Expiration accessToken (erreur 401) renouvellement avec refreshToken
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

async function refreshToken() {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = JSON.parse(sessionStorage.getItem('userTokens')).refresh_token;
      instanceRefresh.post("users/refresh", { refresh_token })
      .then(async (res) => {
        const refresh = JSON.parse(sessionStorage.getItem('userTokens'))
        refresh.access_token = res.data.token;
        sessionStorage.setItem('userTokens', JSON.stringify(refresh));
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
    } catch (err) {
      return reject(err);
    }
  })
}
export { instance };