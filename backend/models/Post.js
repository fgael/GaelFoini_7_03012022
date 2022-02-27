/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle Post */
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Post",
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
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true, // Ici pour faire du softDelete
    }
  );
  return Post;
};
