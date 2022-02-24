<template>
<div class="container" v-if="currentUser">
  <div class="current-user">
    Bonjour {{currentUser.pseudo}}
  </div>
  <div v-for="post in posts.slice().reverse()" :key="post.id" class="posts">
    <div class="post-title">
      <p>{{post.title}}</p>
    </div>
    <div v-if="post.imageUrl" class="post-img">
        <img :src="post.imageUrl" alt="image du post">
    </div>
    <div class="post-content">
      <p>{{post.content}}</p>
    <div class="modifyPostBtn">
      <modale :revele="revele" :toggleModale="toggleModale"></modale>
      <button v-if="currentUser.id == post.user_id" @click="toggleModale">Editer le post</button>
    </div>
    <div class="deletePostBtn">
      <button v-if="currentUser.id == post.user_id || currentUser.role == true" @click="deletePost(post.id)">Supprimer le post</button>
    </div>
    </div>
  </div>
</div>
</template>

<script>

import postServices from '@/services/posts.js'
import Modale from "@/components/ModaleUpdatePost.vue";

export default {
  name: 'MainView',
  data() {
    return {
      posts: [],
      revele: false,
    }
  },
  computed: {
  currentUser() {
    return this.$store.state.userInfos;
    }
  },
  components: {
    modale: Modale
  },
  methods: {
    deletePost(id){
      postServices.deletePost(id)
      .then((res) => {
        console.log(res)
        postServices.getAllPosts()
          .then((res) => {
            console.log(res)
            this.posts = res.data.data
          })
          .catch ((error) => {
            console.log(error)
          })
      })
      .catch ((error) => {
        console.log(error)
      })
    },
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

.current-user {
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 50rem;
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
    p {
      word-break: break-all;
    }

  }
  .post-content {
    background: #f1f1f1;
    border-radius: 0 0 1rem 1rem;
    padding: 1rem;
    p {
      word-break: break-all;
    }
  }

  .post-img{
    display: flex;
    img {
    max-height: 16rem;
    width: 100%;
    object-fit: cover;
    object-position: center;
    }
  }
}





</style>
