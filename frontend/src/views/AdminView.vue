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
    <div class="button">
      <button v-if="user.id != currentUser.id" @click="deleteUserById(user.id)">Supprimer compte</button>
      <button v-if="user.id != currentUser.id" @click="updateRole(user.id, user.role)">Modifier rôle</button>
    </div>
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
      newRole: false,
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
    },
    deleteUserById(id) {
      userServices.deleteUserById(id)
      .then((res) => {
        console.log(res)
        this.getAllUsers()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    updateRole(id, role) {
      if (role == 1) {
        this.newRole = false
      } else if ( role == 0) {
        this.newRole = true
      } 
      let content = {
        role: this.newRole
      }
      userServices.updateRole(id, content)
      .then((res) => {
        console.log(res)
        this.getAllUsers()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
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

.button {
  display: flex;
  flex-direction: row;
  button {
    margin: 1rem 1.5rem 0 0;
  }
}

</style>
