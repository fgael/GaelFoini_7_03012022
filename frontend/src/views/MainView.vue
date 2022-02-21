<template>
<div class="container" v-if="currentUser">
  <p>Bonjour - {{currentUser.pseudo}}</p>
  <modale :revele="revele" :toggleModale="toggleModale"></modale>
  <button @click="toggleModale">Créer un post</button>
  <div class="post-container">
    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{post.title}}</p>
      <p>{{post.content}}</p>
    </div>
  </div>
</div>
</template>

<script>

import postServices from '@/services/posts.js'
import Modale from "@/components/ModalePost.vue";

export default {
  name: 'MainView',
  data() {
    return {
      revele: false,
      posts: [],
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
    postServices.getAllPosts()
    .then((res) => {
      console.log(res)
      this.posts = res.data.data
    })
    .catch ((error) => {
      console.log(error)
    })
  }
}
  


</script>

<style lang="scss" scoped>

</style>
