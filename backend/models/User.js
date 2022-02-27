/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle User */
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true, // Ici une validation de données
        },
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i, // Ici une contrainte
      },
      role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      paranoid: true, // Ici pour faire du softDelete
    }
  );
  return User;
};
