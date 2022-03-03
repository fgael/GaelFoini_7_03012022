<div align="center">

# Groupomania

<img src="http://forthebadge.com/images/badges/built-with-love.svg" height="40px" /> <img src="https://forthebadge.com/images/badges/powered-by-coders-sweat.svg"  height="40px" />

</div>

<p align="center">
Projet pour OpenClassrooms
<br/>
Par Gaël Foini
<br/>
</p>

## À propos

Le site Groupomania, un réseau social d’entreprise, produit par Gaël Foini pour la formation de développeur web chez OpenClassrooms.

Contenance du site :

- Création de pages dynamiques pour un réseau social,
- Utilisation de Javascript, Node.js, JWT, Express, Joi, Sequelize et VueJS 3,
- Création de messages/commentaires, suppression et modification.

### Développer avec

Liste de tous les languages utilisés pour la création du site :

- [HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- [VueJS](https://v3.vuejs.org/guide/introduction.html)
- [Node.js](https://nodejs.org/en/)

# Mise en place

Pour pouvoir utiliser le site et accéder à toutes les fonctionnalités que propose Groupomania, vous aurez besoin d'installer certains packages :

- NodeJs version : v17.4.0

Dans la console de terminal de Visual Studio Code :

Cloner le projet à partir de https://github.com/fgael/GaelFoini_7_03012022

## Installation backend

```
à partir du dossier cloné :

"cd ./backend/"
"mkdir images"
"npm install"
```

### Créer une base de donnée mySQL avec le nom "groupomania ou l'importer depuis le dossier BDD"

```
Verifier vos données de connection dans le fichier "/backend/.env",
puis créer votre database :
"CREATE DATABASE groupomania";

Optionnel : pour avoir un compte admin déjà crée, importer la base de données dans mySQL,
depuis le dossier BDD :
mysql -u [utilisateur] -p groupomania < groupomania.sql
```

### Démarrage backend

```
"npm run dev"
```

## Installation frontend

```
à partir du dossier cloné :

"cd ./frontend/"
"npm install"
```

### Démarrage frontend

```
"npm run serve"
```

### Rôle admin/modérateur

Après avoir démarrer le serveur back-end et front-end,
une page devrait s'ouvrir automatiquement sur votre navigateur préféré,

```
Pour obtenir votre rôle administrateur/modérateur,
il ne restera plus qu'a entrer la clef secrete : "sezameouvretoi",
lors de votre création de compte.

Si la base de données à été importé depuis le dossier BDD,
se connecter avec le compte "admin@groupomania.com" et le mot de passe "Group0mania".
```

## Contacts

Gaël Foini - gaelfoinidev@gmail.com

Lien du projet : [https://github.com/fgael/GaelFoini_7_03012022](https://github.com/fgael/GaelFoini_7_03012022)
