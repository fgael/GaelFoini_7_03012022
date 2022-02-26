<template>
  <div class="navcontainer">
      <router-link to="/">
        <img v-if="$screen.width >= 1200" src="../assets/icon-left-font-monochrome-white.svg" alt="logo">
        <img v-else src="../assets/icon-monochrome-white.png" alt="logo">
      </router-link>
      <li>
        <div class="admin" v-if="currentUser.role == 1">
          <router-link to="/admin" class="navLink">
             <div class="iconNavBar">
              <fa class="icon" icon="hammer"/>
              <p v-if="$screen.width >= 1200">Page admin</p>
            </div>
          </router-link>
        </div>
      </li>
      <li>
        <router-link to="/" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="home"/>
            <p v-if="$screen.width >= 1200">Accueil</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/post" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="feather"/>
            <p v-if="$screen.width >= 1200">Nouveau post</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="navLink">
          <div class="iconNavBar">
            <fa class="icon" icon="user"/>
            <p v-if="$screen.width >= 1200">Profil</p>
          </div>
        </router-link>
      </li>
      <li @click="logout()" class="logout">
        <div class="iconNavBar">
          <fa class="icon" icon="power-off"/>
          <p v-if="$screen.width >= 1200">Déconnexion</p>
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
