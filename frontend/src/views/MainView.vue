<template>
<div class="container" v-if="currentUser">
  <div class="current-user">
    Bonjour {{currentUser.pseudo}}
  </div>
  <div class="post-container">
    <div v-for="post in posts.slice().reverse()" :key="post.id" class="posts">
      <div class="post-title">
        {{post.title}}
      </div>
      <div class="post-img">
          <img :src="post.imageUrl" alt="image du post">
      </div>
      <div class="post-content">
        {{post.content}}
        <div class="modifyPostBtn">
          <button @click="updatePost()">Editer le post</button>
        </div>
        <div class="deletePostBtn">
          <button @click="deletePost()">Supprimer le post</button>
        </div>
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
  margin: 3rem 1rem;
  box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.74);
  -webkit-box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.50);
  -moz-box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.50);
  .post-title {
    display: flex;
    justify-content: center;
    border-radius: 1rem 1rem 0 0;
    padding: 1.2rem;
    background: #1976d2;
    color: white;

  }
  .post-content {
    background: #f1f1f1;
    border-radius: 0 0 1rem 1rem;
    padding: 1rem;
  }
  .post-img{
    display: flex;
    img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    }
  }
}





</style>
