<template>
  <body class="bodycontainer">
    <main>
      <NavBar v-if="currentUser" />
      <router-view/>
    </main>
  </body>

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

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

main{
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

body {
  background-color: #091f43;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
    flex-grow: 2;
    border-radius: 0 1rem 1rem 0;
    padding: 2rem;
    background: white;
}

li {
  list-style: none;
}


</style>
