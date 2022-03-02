<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale">
      <div @click="toggleModale" class="btn-modale">X</div>
      <h2>Editer votre profil</h2>
      <div class="formGroup">
        <form class="modifyForm">
          <div class="lastName">
            <label for="lastName">Nom</label>
            <input v-model="user.nom" class="form-input" id="lastName" type="text" placeholder="Martin" />
          </div>
          <div class="firstName">
            <label for="firstName">Prénom</label>
            <input v-model="user.prenom" class="form-input" id="firstName" type="text" placeholder="Jacques" />
          </div>
          <div class="nickName">
            <label for="nickName">Pseudo</label>
            <input v-model="user.pseudo" class="form-input" id="nickName" type="text" placeholder="martinjacques" />
          </div>
          <div class="email">
            <label for="email">E-mail</label>
            <input v-model="user.email" class="form-input" id="email" type="text" placeholder="martinjacques@gmail.com" />
          </div>
          <!-- <div class="password">
            <label for="password">Mot de passe</label>
            <input v-model="user.password" class="form-input" id="password" type="text" placeholder="password" />
          </div> -->
          <button @click="modifyAccount()">
            <div class="iconBtn">
              <fa icon="square-check"/>
            </div>
            <p>Valider</p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "ModaleProfile",
  props: ['revele', 'toggleModale'],
  data() {
    return {
      user: {},
    }
  },
  methods: {
    modifyAccount() {
      this.$store.dispatch('userUpdate', {
          id: this.$store.state.userInfos.id,
          user: this.user
        }).then(function (res) {
            console.log(res)
        }, function (error) {
            console.log(error)
      })
    }
  }
}

</script>


<style lang="scss" scoped>

.bloc-modale {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .modale {
    background: white;
    color: #333;
    padding: 1.5rem;
    position: fixed;
    top: 20%;
    width: 18rem;
    max-width: 60vh;
    border-radius: 1rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .btn-modale {
      position: absolute;
      right: 1.2rem;
      color: white;
      background: red;
      padding: 0.2rem;
      border-radius: 0.3rem;
    }
    .formGroup {
      label {
        margin-right: 0.5rem;
        font-size: 1.1rem;
      }
      input {
        width: 15rem;
        margin: 0.5rem 0;
        height: 1.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid black;
        background: #f1f1f1;
        &:focus-visible {
          outline: 2px solid #1976d2;
          border-radius: 0.5rem;
          border: none;
        }
      }     
      button {
        margin: 1rem 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1976d2 ;
        color: white;
        border-radius: 0.5rem;
        border: none;
        padding: 0.3rem 0.7rem;
        transition: 0.4s background-color;
        font-size: 1rem;
        width: 100%;
        p {
          font-size: 0.9rem;
        }
        &:hover{
          cursor: pointer;
          background: #3da9fc;
        }
        .iconBtn {
          margin-right: 0.5rem;
        }
      }
    }
  }
}

</style>