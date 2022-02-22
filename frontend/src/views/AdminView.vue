<template>
<div class="container" v-if="currentUser">
  <div class="current-user">
    Bonjour {{currentUser.pseudo}}
  </div>
  <div v-for="user in users" :key="user.id" class="user">
    <div class="lastName">
      Nom de famille : {{user.nom}}
    </div>
    <div class="firstName">
      Prénom : {{user.prenom}}
    </div>
    <div class="nickName">
      Pseudo : {{user.pseudo}}
    </div>
    <div class="role">
      Administrateur : {{user.role}}
    </div>
    <button @click="deleteUserById(currentUser.id)">Supprimer compte</button>
    <button @click="modifyRole(currentUser.id)">Modifier rôle</button>
  </div>
</div>
</template>

<script>

import userServices from '@/services/users.js'

export default {
  name: 'AdminView',
  data() {
    return {
      users: [],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  methods: {
    getAllUsers() {
      userServices.getAllUsers()
      .then((res) => {
      console.log(res)
      this.users = res.data.data
      })
      .catch ((error) => {
      console.log(error)
      })
      }
    },
    deleteUserById(id) {
      userServices.deleteUserById(id)
      .then((res) => {
        console.log(res)
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    beforeMount() {
      this.getAllUsers()
    },
    mounted() {
    if (!this.$store.state.loggedIn){
      this.$router.push('/login');
      return;
    }
  }
}

</script>

<style lang="scss" scoped>

.user {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem 0;
}

</style>
