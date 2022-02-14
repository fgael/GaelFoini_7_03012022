<template>
  <body class="bodycontainer">
    <div class="nav" v-if="currentUser">
      <NavBar />
    </div>
    <main>
     <router-view/>
    </main>
  </body>

</template>

<script>

import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
  NavBar,
  },
  computed: {
  currentUser() {
    return this.$store.state.loggedIn;
    }
  },
}
</script>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
}

body {
  background-color: #091f43;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

.nav {
  width: 30%;
}

.container {
    color: white;
    font-size: 20px;
    width: 300px;
}

</style>
