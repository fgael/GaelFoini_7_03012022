/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle Commentaire */
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
    },
    {
      paranoid: true, // Ici pour faire du softDelete
    }
  );
  return Comment;
};
