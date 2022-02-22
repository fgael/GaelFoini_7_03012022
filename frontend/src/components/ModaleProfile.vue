<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale">
      <div @click="toggleModale" class="btn-modale">X</div>
      <h2>Editer votre profil</h2>
      <div class="form-group">
        <form class="modifyForm">
          <div class="firstName">
            <label for="firstName">Prénom</label>
            <input v-model="user.prenom" class="form-input" id="firstName" type="text" placeholder="Jacques" />
          </div>
          <div class="lastName">
            <label for="lastName">Nom</label>
            <input v-model="user.nom" class="form-input" id="lastName" type="text" placeholder="Martin" />
          </div>
          <div class="nickName">
            <label for="nickName">Pseudo</label>
            <input v-model="user.pseudo" class="form-input" id="nickName" type="text" placeholder="martinjacques" />
          </div>
          <div class="email">
            <label for="email">E-Mail</label>
            <input v-model="user.email" class="form-input" id="email" type="text" placeholder="martinjacques@gmail.com" />
          </div>
          <!-- <div class="password">
            <label for="password">Mot de passe</label>
            <input v-model="user.password" class="form-input" id="password" type="text" placeholder="password" />
          </div> -->
          <button @click="modifyAccount()">Valider</button>
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 1.5rem;
  position: fixed;
  top: 30%;
  max-width: 60vh;
  border-radius: 1rem;
}

.btn-modale {
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;
  background: red;
  padding: 0.2rem;
  border-radius: 0.3rem;
}

h2 {
  margin: 1rem 0 1rem 0;
}

label {
  margin-right: 0.5rem;
}
</style>