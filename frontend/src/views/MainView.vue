<template>
<div class="container" v-if="currentUser">
  <p>hello world - {{currentUser.pseudo}}</p>
  <button @click="logout()" class="button">
    Déconnexion
  </button>
  <div class="admin" v-if="currentUser.role == 1">
      <router-link to="/admin" class="nav-link">AdminBoard</router-link>
  </div>
</div>
</template>

<script>

export default {
  name: 'MainView',
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
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
