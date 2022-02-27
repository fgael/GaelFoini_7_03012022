/* Import des modules necessaires */
const express = require("express");
const cors = require("cors");
const path = require("path");

/** Initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Import des modules de routage */
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

/* Mise en place du routage */
app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/", (req, res) => res.send(`I'm online!`));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.all("*", (req, res) => res.status(501).send(`Where are you going?`));

module.exports = app;
