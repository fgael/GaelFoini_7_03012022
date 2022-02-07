<template>
  <div class="container">
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
      <input v-model="email" class="form-group__input" type="text" placeholder="Email" />
    </div>
    <div class="form-group" v-if="type == 'create'">
      <input v-model="pseudo" class="form-group__input" type="text" placeholder="Pseudo" />
    </div>
    <div class="form-group">
      <input v-model="password" class="form-group__input" type="text" placeholder="Mot de passe" />
    </div>
    <div class="form-group" v-if="type == 'create'">
      <input v-model="secretKey" class="form-group__input" type="text" placeholder="(Optionnel) Formule magique" />
    </div>
    <div class="form-group">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="type == 'login'">
        Connexion
      </button>
      <button @click="createAccount()"  class="button" :class="{'button--disabled' : !validatedFields}" v-else>Créer mon compte</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginView',
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
    }
 },

  methods: {
    switchCreateAccount() {
      this.type = "create";
    },
    switchLogin() {
      this.type = "login";
    },
    switchAdmin(){
        this.type = "secretKey"
    },
    login() {
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
        }).then(function (response) {
            console.log(response)
        }, function (error) {
            console.log(error);
        })
    },
    createAccount() {
        this.$store.dispatch('createAccount', {
            prenom: this.prenom,
            nom: this.nom,
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
            secret_key: this.secretKey,
        }).then(function (response) {
            console.log(response)
        }, function (error) {
            console.log(error)
            if(error.response.status == 409) {
                alert('Utilisateur déjà existant')
            }
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
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
