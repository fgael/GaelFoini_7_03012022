/* Import des modules nécessaires */
const Sequelize = require(`sequelize`);

/* Configuration de la connection Sequelize BDD */
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

/* */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/User")(sequelize, Sequelize);
db.post = require("./models/Post")(sequelize, Sequelize);
db.comment = require("./models/Comment")(sequelize, Sequelize);

db.post.hasMany(db.comment, { onDelete: "CASCADE", hooks: true });
db.comment.belongsTo(db.post);

module.exports = db;
