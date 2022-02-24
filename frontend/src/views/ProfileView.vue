<template>
<div class="container" v-if="currentUser">
  <div class="faIcon">
  <fa icon="user" />
  </div>
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
    return;
    }
  }
}

</script>

<style lang="scss" scoped>

.faIcon {

  font-size: 3rem;
  margin-bottom: 2rem;
  color: #515ad1;
  border-radius: 50%;
  background: #f1f1f1;
  width: 4.5rem;
  text-align: center;
}

button {
  margin: 0 1rem 0 0;
}

</style>