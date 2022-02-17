<template>
<div class="container" v-if="currentUser">
  <p>Bonjour {{currentUser.nom + ' ' + currentUser.prenom}}</p><br>
  <p>Pseudo {{currentUser.pseudo}}</p><br>
  <p>Votre email {{currentUser.email}}</p>
</div>
</template>

<script>

export default {
  name: 'ProfileView',
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
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