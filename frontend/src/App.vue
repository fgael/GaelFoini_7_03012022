<template>
  <main>
    <NavBar v-if="currentUser"/>
    <router-view/>
  </main>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
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

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');


* {
  font-family: 'Roboto', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

main{
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 70%;
  max-width: 60rem;
}

#app {
  width: 100%;
  background: #091f43;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navcontainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 12rem;
  color: white;
  padding: 1rem;
  background: #515ad1;
  border-radius: 1rem 0 0 1rem;
  li {
    list-style: none;
    cursor: pointer;
  }
  img {
    margin-top: 1.1rem;
    max-height: 1.6rem;
    margin-bottom: 2rem;
  }
  .navLink {
    text-decoration: none;
    color: white;
  }
  .iconNavBar {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    p {
      margin-left: 0.5rem;
    }
  }
  .logout {
    margin-top: 1rem;
  }
}

.container {
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: thin;
  flex-grow: 2;
  border-radius: 0 1rem 1rem 0;
  padding: 2rem;
  background: white;
}



</style>
