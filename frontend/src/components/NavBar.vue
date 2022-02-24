<template>
    <div class="navcontainer">
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo"><br>
        <li>
          <div class="admin" v-if="currentUser.role == 1">
              <router-link to="/admin" class="nav-link">Admin Board</router-link>
          </div><br>
        </li>
        <li><router-link to="/" class="nav-link">Accueil</router-link></li>
        <li><router-link to="/profile" class="nav-link">Profil</router-link></li>
        <li><router-link to="/post" class="nav-link">New Post</router-link></li>
        <li @click="logout()">Déconnexion</li>
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

.navcontainer {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    gap: 1rem;
    color: white;
    padding: 1rem;
    background: #515ad1;
    border-radius: 16px 0 0 16px;
    img {
      max-height: 2rem;
    }
    .nav-link {
      text-decoration: none;
      color: white;
    }
}

</style>
