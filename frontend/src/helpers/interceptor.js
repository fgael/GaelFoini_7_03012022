import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

// const instanceRefresh = axios.create({
//   baseURL: 'http://localhost:8888',
// });

// Mise en place tokens pour requete
instance.interceptors.request.use(async config => {
const token = JSON.parse(sessionStorage.getItem('userTokens'));
  if (token) {
    config.headers.Authorization = token.access_token;
  }
  return config;
});

// let inactivityTime = []
// instance.interceptors.response.use(
//   (response) => {
//     // Suppression tokens si pas de requete pendant duree defini (sup a access_token)
//     inactivityTime.push((Math.round(+new Date() / 1000)))
//     const token = JSON.parse(sessionStorage.getItem('userTokens'));
//     if (!token){
//       return response;
//     } else {
//       // duree avant suppression (- 2700 = 45min)
//         if (inactivityTime[inactivityTime.length - 2] > (Math.round(+new Date() / 1000) - 2700)) {
//           return response;
//       } else {
//         alert("Veuillez vous reconnecter - Temps d'inactivité supérieur à 45 minutes")
//         sessionStorage.removeItem('userTokens');
//         localStorage.removeItem('userInfos');
//         location.reload();
//       }
//     }
//   },
//   Expiration accessToken (erreur 401) renouvellement avec refreshToken
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshToken();
//       return instance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// refreshToken
// async function refreshToken() {
//   return new Promise((resolve, reject) => {
//     try {
//       const refresh_token = JSON.parse(sessionStorage.getItem('userTokens')).refresh_token;
//       const header = {
//         Authorization: refresh_token,
//       };
//       const parameters = {
//         method: "POST",
//         headers: header,
//       };
//       const body = {
//         grant_type: "refresh_token",
//         refresh_token,
//       };
//       // Recuperation refreshToken
//       instanceRefresh
//         .post(
//           "users/refresh",
//           body,
//           parameters
//         )
//         // Mise en place refreshToken
//         .then(async (res) => {
//           const refresh = JSON.parse(sessionStorage.getItem('userTokens'))
//           refresh.access_token = res.data.token;
//           sessionStorage.setItem('userTokens', JSON.stringify(refresh));
//           // return resolve(res);
//         })
//         .catch((err) => {
//           return reject(err);
//         });
//     } catch (err) {
//       return reject(err);
//     }
//   })
// }

export { instance };