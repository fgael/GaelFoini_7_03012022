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
  z-index: 1;
  gap: 2rem;
  max-width: 12rem;
  color: white;
  padding: 1rem;
  background: #1976d2;
  border-radius: 1rem 0 0 1rem;
  li {
    list-style: none;
    cursor: pointer;
  }
  img {
    margin-top: 1.1rem;
    max-height: 1.6rem;
    margin-bottom: 1rem;
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
    .icon { 
      transition: all 200ms ease-in;
      transform: scale(1);   
      &:hover {
        transition: all 200ms ease-in;
        transform: scale(1.5);
      }
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
  padding: 1.8rem;
  background: white;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1976d2;
  color: white;
  border-radius: 0.5rem;
  border: none;
  transition: 0.4s background-color;
  &:hover{
    cursor: pointer;
    transition: 0.4s background-color;
    background: #3da9fc;
  }
}

.iconBtnLarge {
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

textarea {
  padding: 0.5rem;
  resize: none;
  width: 100%;
  border-radius: 0.5rem;
  &:focus-visible {
  outline: 2px solid #1976d2;
  border-radius: 0.5rem;
  }
}

@media screen and (max-width: 1024px){
main {
  width: 100%;
  }

.navcontainer {
  align-items: center;
  border-radius: 0;
  }

.container {
  padding: 1rem;
  border-radius: 0;
  }
}

@media screen and (max-width: 500px){
  main {
    flex-direction: column;
  }
  .navcontainer {
    max-width: 100%;
    height: 4rem;
    flex-direction: row;
    position: sticky;
    top: 0px;
    right: 0px;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    .logout {
      margin-top: 0;
    }
  }
  .container {
   padding: 0.5rem;
  }
}

</style>
