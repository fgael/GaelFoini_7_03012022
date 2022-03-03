<template>
  <div class="navContainer">
      <router-link to="/">
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo" class="logo">
      </router-link>
      <li>
        <div v-if="currentUser.role == 1">
          <router-link to="/admin" class="navLink">
             <div class="iconNavBar">
              <fa class="icon" icon="hammer"/>
              <p class="navContainer__p">Page admin</p>
            </div>
          </router-link>
        </div>
      </li>
      <li>
        <router-link to="/" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="home"/>
            <p class="navContainer__p">Accueil</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/post" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="feather"/>
            <p class="navContainer__p">Nouveau post</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="user"/>
            <p class="navContainer__p">Profil</p>
          </div>
        </router-link>
      </li>
      <li @click="logout()" class="logout">
        <div class="iconNavBar">
          <fa class="icon" icon="power-off"/>
          <p class="navContainer__p">Déconnexion</p>
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
