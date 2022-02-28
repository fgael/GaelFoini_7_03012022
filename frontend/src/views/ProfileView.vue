<template>
  <div class="container" v-if="currentUser">
    <div class="containerIcon">
      <div class="icon">
        <fa icon="user" />
      </div>
    </div>
    <div class="containerUser">
      <div class="nom">
        <p>Nom : {{currentUser.nom}}</p>
      </div>
      <div class="prenom">
        <p>Prénom : {{currentUser.prenom}}</p>
      </div>
      <div class="pseudo">
        <p>Pseudo : {{currentUser.pseudo}}</p> 
      </div>
      <div class="email">
        <p>Email : {{currentUser.email}}</p>    
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
  .containerIcon {
    display: flex;
    justify-content: center;
    margin-top: 0.3rem;
  }
  .icon {
    font-size: 1.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
    color: #515ad1;
    border-radius: 50%;
    background: #f1f1f1;
    width: 4rem;
    text-align: center;
  }
}


.containerUser {
  padding: 1rem;
  background: #f1f1f1;
  border-radius: 1rem;
  p {
    font-size: 1.1rem;
    margin: 0.6rem 0;
  }
}


.button {
  margin: 1rem 0;
  button {
    margin: 1rem 0;
    display: flex;
    font-size: 1rem;
    padding: 0.3rem 0.7rem;
    p {
      margin: 0;
    }
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