<template>
  <div class="container" v-if="currentUser">
    <p class="nicknameLetter" v-if="getLetter()">{{nicknameLetter}}</p>
    <div class="containerUser">
      <div class="nom">
        <p class="containerUser__p">Nom : {{currentUser.nom}}</p>
      </div>
      <div class="prenom">
        <p class="containerUser__p">Prénom : {{currentUser.prenom}}</p>
      </div>
      <div class="pseudo">
        <p class="containerUser__p">Pseudo : {{currentUser.pseudo}}</p> 
      </div>
      <div class="email">
        <p class="containerUser__p">Email : {{currentUser.email}}</p>    
      </div>
    </div>
    <modale :revele="revele" :toggleModale="toggleModale"></modale>
    <div class="button">
      <button type="button" @click="toggleModale">
        <div class="iconBtn">
          <fa icon="feather"/>
        </div>
        <p>Editer votre profil</p>
      </button>
      <button type="button"  @click="deleteUserById(currentUser.id)">
        <div class="iconBtn">
          <fa icon="trash"/>
        </div>
        <p>Supprimer votre compte</p>
      </button>
    </div>
  </div>
</template>

<script>

import userServices from '@/services/users.js'
import Modale from "@/components/ModaleProfile.vue";

export default {
  name: 'ProfileView',
  data() {
    return {
      revele: false,
      nicknameLetter: "",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  components: {
    modale: Modale
  },
  methods: {
    deleteUserById(id) {
      userServices.deleteUserById(id)
      .then((res) => {
        console.log(res)
        this.logout()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    toggleModale: function(){
      this.revele = !this.revele;
    },
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
    getLetter() {
      this.nicknameLetter = this.currentUser.pseudo.slice(0,1)
      return true;
    }
  },
  mounted: function () {
  if (!this.$store.state.loggedIn){
    this.$router.push('/login');
    }
  }
}

</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .nicknameLetter {
    margin-top: 1rem;
  }
}

.containerUser {
  width: 20rem;
  padding: 1rem;
  margin-top: 2rem;
  background: #f1f1f1;
  border-radius: 1rem;
  &__p {
    font-size: 1.1rem;
    margin: 0.6rem 0;
    word-break: break-all;
  }
}


.button {
  margin: 1rem 0;
  button {
    width: 20rem;
    margin: 1rem 0;
    display: flex;
    font-size: 1rem;
    padding: 0.3rem 0.7rem;
    .iconBtn {
      margin-right: 0.5rem;
      font-size: 0.9rem;
    }
  }
}

@media screen and (max-width: 768px){
  .container {
    padding: 1rem;
  }
}


</style>