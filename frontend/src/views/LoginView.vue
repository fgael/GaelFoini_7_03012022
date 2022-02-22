<template>
  <div class="containerLogin">
    <img src="../assets/icon-left-font.png" alt="logo">
    <h1 class="container__title" v-if="type == 'login'">Connexion</h1>
    <h1 class="container__title" v-else>Inscription</h1>
      <p class="container__subtitle" v-if="type == 'login'">
      Tu n'as pas encore de compte ?
      <span class="container__action" @click="switchCreateAccount">Créer un compte</span>
      </p>
      <p class="container__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="container__action" @click="switchLogin">Se connecter</span>
      </p>
      <div class="form-group" v-if="type == 'create'">
        <input v-model="prenom" class="form-group__input" type="text" placeholder="Prénom" />
        <input v-model="nom" class="form-group__input" type="text" placeholder="Nom" />
      </div>
      <div class="form-group">
        <input v-model="email" class="form-group__input" type="text" placeholder="E-mail" />
      </div>
      <div class="form-group" v-if="type == 'create'">
        <input v-model="pseudo" class="form-group__input" type="text" placeholder="Pseudo" />
      </div>
      <div class="form-group">
        <input v-model="password" class="form-group__input" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-group" v-if="type == 'create'">
        <input v-model="secretKey" class="form-group__input" type="text" placeholder="Formule magique" />
      </div>
      <div class="form-group" v-if="type == 'login' && status == 'error_login'">
        Adresse e-mail et/ou mot de passe invalide
      </div>
      <div class="form-group" v-if="type == 'create' && status == 'error_create'">
        Adresse e-mail déjà utilisée
      </div>
      <div class="form-group">
        <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="type == 'login'">
          <span v-if="status == 'loading'">Connexion en cours ... </span>
          <span v-else>Connexion</span>
        </button>
        <button @click="createAccount()"  class="button" :class="{'button--disabled' : !validatedFields}" v-else>
          <span v-if="status == 'loading'">Création en cours ... </span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      type: 'login',
      prenom: '',
      nom: '',
      email: '',
      pseudo: '',
      password: '',
      secretKey: '',
    }
  },
  computed: {
    validatedFields() {
      if (this.type == 'create') {
        if (this.prenom !="" && this.nom !="" && this.email !="" && this.pseudo !="" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
 },
  methods: {
    switchCreateAccount() {
      this.type = "create";
    },
    switchLogin() {
      this.type = "login";
    },
    login() {
      const self = this;
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
        }).then(function () {
          self.$router.push('/');
        }, function (error) {
            console.log(error);
        })
    },
    createAccount() {
      const self = this;
        this.$store.dispatch('createAccount', {
            prenom: this.prenom,
            nom: this.nom,
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
            secret_key: this.secretKey,
        }).then(function () {
            self.login();
        }, function (error) {
            console.log(error)
      })
    }
  },
  mounted: function () {
    if (this.$store.state.loggedIn){ 
      this.$router.push('/');
    }
  },
}
</script>

<style lang="scss" scoped>
.containerLogin {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
    img {
    display: block;
    margin: 15% auto;
    width: 75%;
  }
  .container__action {
    color: #2196f3;
    text-decoration: underline;
  }
  .container__action:hover {
    cursor: pointer;
  }
  .container__title {
    text-align: center;
    font-weight: 800;
    padding-bottom: 1rem;
  }
  .container__subtitle {
    text-align: center;
    color: #666;
    font-weight: 500;
    padding-bottom: 1rem;
  }
  .form-group {
    display: flex;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
    .form-group__input {
      padding: 8px;
      border: none;
      border-radius: 8px;
      background: #f2f2f2;
      font-weight: 500;
      font-size: 16px;
      flex: 1;
      min-width: 100px;
      color: black;
    }
    .form-group__input::placeholder {
      color: #aaaaaa;
    }
    .button {
      background: #1976d2 ;
      color: white;
      border-radius: 8px;
      font-weight: 800;
      font-size: 15px;
      border: none;
      width: 100%;
      padding: 16px;
      transition: 0.4s background-color;
    }
    .button:hover {
      cursor: pointer;
      background: #3da9fc;
    }
    .button--disabled {
      background: #cecece;
      color: #ececec;
    }
    .button--disabled:hover {
      cursor: not-allowed;
      background: #cecece;
    }
  }
}
</style>
