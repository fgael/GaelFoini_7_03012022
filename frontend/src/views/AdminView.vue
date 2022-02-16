<template>
<div class="container">
  <p>hello world - {{currentUser}}</p>
  <button @click="getAllUsers()">Afficher tous les utilisateurs</button>
</div>
</template>

<script>

export default {
  name: 'AdminView',
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
    getAllUsers() {
      this.$store.dispatch('getAllUsers', {       
      }).then(function (res) {
      console.log(res)
      }, function (error) {
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
