<template>
<div class="container">
  <p>hello world - {{currentUser}}</p>
  <button @click="getUsersById(currentUser.id)">Afficher tous les utilisateurs</button>
  <p>hello world - {{users}}</p>
</div>
</template>

<script>

import userServices from '@/services/users.js'

export default {
  name: 'AdminView',
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    getUsersById(id) {
      userServices.getUsersById(id)
      .then((res) => {
      console.log(res)
      this.users = res.data
      })
      .catch ((error) => {
      console.log(error)
      })
      }
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

</style>
