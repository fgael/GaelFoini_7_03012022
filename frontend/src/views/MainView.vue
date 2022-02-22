<template>
<div class="container" v-if="currentUser">
  <div class="current-user">
    Bonjour {{currentUser.pseudo}}
  </div>
  <div class="post-container">
    <div v-for="post in posts" :key="post.id" class="posts">
      <div class="post-title">
        {{post.title}}
      </div>
      <div class="post-content">
        {{post.content}}
      </div>
    </div>
  </div>
</div>
</template>

<script>

import postServices from '@/services/posts.js'

export default {
  name: 'MainView',
  data() {
    return {
      posts: [],
    }
  },
  computed: {
  currentUser() {
    return this.$store.state.userInfos;
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

.current-user {
  display: flex;
  justify-content: center;
}

.posts {
  border-radius: 1rem;
  margin: 1rem;
  .post-title {
    display: flex;
    justify-content: center;
    background: #1976d2;
    color: white;
    border-radius: 1rem 1rem 0 0;
  }
  .post-content {
    padding: 0.5rem;
    background: #f1f1f1;
    border-radius: 0 0 1rem 1rem;
  }
}


</style>
