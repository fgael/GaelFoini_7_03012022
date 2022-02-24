<template>
  <div class="navcontainer">
      <router-link to="/">
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo">
      </router-link>
      <li>
        <div class="admin" v-if="currentUser.role == 1">
          <router-link to="/admin" class="navLink">
             <div class="iconNavBar">
              <fa icon="hammer"/>
              <p>Page admin</p>
            </div>
          </router-link>
        </div>
      </li>
      <li>
        <router-link to="/" class="navLink">
          <div class="iconNavBar">
            <fa icon="home"/>
            <p>Accueil</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/post" class="navLink">
          <div class="iconNavBar">
            <fa icon="feather"/>
            <p>Nouveau post</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="navLink">
          <div class="iconNavBar">
            <fa icon="user"/>
            <p>Profil</p>
          </div>
        </router-link>
      </li>
      <li @click="logout()" class="logout">
        <div class="iconNavBar">
          <fa icon="power-off"/>
          <p>Déconnexion</p>
        </div>
      </li>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data() {
    return {
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
}

</script>

<style lang="scss" scoped>

</style>
