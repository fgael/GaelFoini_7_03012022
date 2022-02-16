<template>
<div class="container" v-if="currentUser">
  <p>hello world - {{currentUser.pseudo}}</p>
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
}
  


</script>

<style lang="scss" scoped>

</style>
