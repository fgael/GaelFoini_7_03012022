<template>
<div class="container" v-if="currentUser">
  <img src="../assets/pfp.png" alt="pfp">
  <div >
    Nom : {{currentUser.nom}}
  </div>
  <div>
    Prénom : {{currentUser.prenom}}
  </div>
  <div>
   Pseudo : {{currentUser.pseudo}}
  </div>
  <div>
    Email : {{currentUser.email}}
  </div>
  <modale :revele="revele" :toggleModale="toggleModale"></modale>
  <button @click="toggleModale">Editer votre profil</button>
  <button @click="deleteUserById(currentUser.id)">Supprimer votre compte</button>
</div>
</template>

<script>

import userServices from '@/services/users.js'
import Modale from "@/components/ModaleProfile.vue";

export default {
  name: 'ProfileView',
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  data() {
    return {
      revele: false,
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
  },
    mounted: function () {
    if (!this.$store.state.loggedIn){
      this.$router.push('/login');
      return;
    }
  }
}

</script>

<style lang="scss" scoped>

img {
  border-radius: 50%;
  height: 4rem;
  margin-bottom: 2rem;
}

button {
  margin: 0 1rem 0 0;
}

</style>