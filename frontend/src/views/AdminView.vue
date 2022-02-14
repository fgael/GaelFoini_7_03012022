<template>
<div class="container">hello world
  <p>{{currentUser}}</p>
  <button @click="logout()" class="button">
    Déconnexion
  </button>
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
    }
  },
  mounted: function () {
    if (this.$store.state.user.access_token == ''){
      this.$router.push('/login');
      return;
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
    color: white;
    font-size: 30px;
}
</style>
