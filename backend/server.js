/* Import des modules necessaires */
const app = require("./app");

/** Import de la connection à la DB */
let DB = require("./db.config");

/** Start server avec synchronisation sequelize et test DB */
DB.sequelize
  .sync() // { force: true } // { alter: true }
  .then(() => console.log("DB connection OK"))
  // Demarrage serveur
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is running on port ${process.env.SERVER_PORT}. Enjoy !`
      );
    });
  })
  // Arret du serveur si connection impossible
  .catch((err) => {
    console.log("DB connection failed !" + "\n", err);
  });
