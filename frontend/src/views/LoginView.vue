<template>
  <div class="container">
    <div class="containerLog">
      <div class="logo">
        <img src="../assets/icon-left-font.png" alt="logo">
      </div>
      <h1 class="containerTitle" v-if="type == 'login'">Connexion</h1>
      <h1 class="containerTitle" v-else>Inscription</h1>
      <p class="containerSubtitle" v-if="type == 'login'">
        Tu n'as pas encore de compte ?
        <span class="containerAction" @click="switchCreateAccount">Créer un compte</span>
      </p>
      <p class="containerSubtitle" v-else>
        Tu as déjà un compte ?
        <span class="containerAction" @click="switchLogin">Se connecter</span>
      </p>
      <div class="formGroup" v-if="type == 'create'">
        <input v-model="prenom" class="formGroup_input" type="text" placeholder="Prénom" />
        <input v-model="nom" class="formGroup_input" type="text" placeholder="Nom" />
      </div>
      <div class="formGroup">
        <input v-model="email" class="formGroup_input" type="text" placeholder="E-mail" />
      </div>
      <div class="formGroup" v-if="type == 'create'">
        <input v-model="pseudo" class="formGroup_input" type="text" placeholder="Pseudo" />
      </div>
      <div class="formGroup">
        <input v-model="password" class="formGroup_input" type="password" placeholder="Mot de passe" />
      </div>
      <div class="formGroup" v-if="type == 'create'">
        <input v-model="secretKey" class="formGroup_input" type="text" placeholder="(Optionnel - Formule magique)" />
      </div>
      <div class="formGroup" v-if="type == 'login' && status == 'error_login'">
        Adresse e-mail et/ou mot de passe invalide
      </div>
      <div class="formGroup" v-if="type == 'create' && status == 'error_create'">
        Adresse e-mail déjà utilisée
      </div>
      <div class="formGroup">
        <button type="button" @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="type == 'login'">
          <span v-if="status == 'loading'">Connexion en cours ... </span>
          <span v-else>Connexion</span>
        </button>
        <button type="button" @click="createAccount()"  class="button" :class="{'button--disabled' : !validatedFields}" v-else>
          <span v-if="status == 'loading'">Création en cours ... </span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
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
    // desactivation du bouton connection ou creer un compte si champs manquant
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
    // changement d'affichage connection, création de compte
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #091f43;
  overflow-y: hidden;
  .containerLog {
    width: 33rem;
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    height: 40rem;
      .logo {
        display: flex;
        justify-content: center;
        height: 3.5rem;
        margin: 2rem 0 3rem 0;
      }
      .containerTitle {
        text-align: center;
        font-weight: 700;
        padding-bottom: 1rem;
      } 
      .containerAction {
        color: #2196f3;
        text-decoration: underline;
        &:hover {
          cursor: pointer;
        }
      }
      .containerSubtitle {
        text-align: center;
        color: #666;
        font-weight: 500;
        padding-bottom: 1rem;
      }
      .formGroup {
        display: flex;
        margin: 16px 0px;
        gap: 16px;
        flex-wrap: wrap;
        .formGroup_input {
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
        .formGroup_input::placeholder {
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
          &:hover {
            cursor: pointer;
            background: #3da9fc;
          }
        }
        .button--disabled {
        background: #cecece;
        color: #ececec;
        &:hover {
          cursor: not-allowed;
          background: #cecece;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px){
  .container {
    .containerLog {

      height: 100%;
      width: 100%;
      border-radius: 0;
      .logo {
        margin-top: 30%;
      }
      img {
        width: 20rem;
      }
    }
  }
}

@media screen and (max-width: 500px){
  .container {
    .containerLog {
      .logo {
        margin-top: 10%;
      }
    }
  }
}

</style>
