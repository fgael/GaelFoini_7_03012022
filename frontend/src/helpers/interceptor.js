import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

const instanceRefresh = axios.create({
  baseURL: 'http://localhost:8888',
});

// Mise en place tokens pour requete
instance.interceptors.request.use(async config => {
const token = JSON.parse(localStorage.getItem('userTokens'));
  if (token) {
    config.headers.Authorization = token.access_token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  // Si expiration accessToken (erreur 401) redirection vers refreshToken
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

// Mise en place nouveau accessToken grace au refreshToken
async function refreshToken() {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = JSON.parse(localStorage.getItem('userTokens')).refresh_token;
      instanceRefresh.post("users/refresh", { refresh_token })
      .then(async (res) => {
        const refresh = JSON.parse(localStorage.getItem('userTokens'))
        refresh.access_token = res.data.token;
        localStorage.setItem('userTokens', JSON.stringify(refresh));
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

// Exportation instance pour recuperer axios dans ./services
export { instance };