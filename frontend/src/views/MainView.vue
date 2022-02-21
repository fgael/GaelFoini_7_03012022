<template>
<div class="container" v-if="currentUser">
  <p>Bonjour - {{currentUser.pseudo}}</p>
  <modale :revele="revele" :toggleModale="toggleModale"></modale>
  <button @click="toggleModale">Créer un post</button>
  <div class="post-container">
    <!-- <div class="post">
      {{currentPost.title}}
    </div> -->
  </div>
</div>
</template>

<script>

// import postServices from '@/services/users.js'
import Modale from "@/components/ModalePost.vue";

export default {
  name: 'MainView',
  data() {
    return {
      revele: false,
    }
  },
  components: {
    modale: Modale
  },
  computed: {
  currentUser() {
    return this.$store.state.userInfos;
    }
  },
  methods: {
    toggleModale: function(){
      this.revele = !this.revele;
    }
  },
  mounted: function () {
    if (!this.$store.state.loggedIn){
      this.$router.push('/login');
      return;
    }
  }
}
  


</script>

<style lang="scss" scoped>

</style>
