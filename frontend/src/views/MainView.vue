<template>
  <div class="container" v-if="currentUser">
    <div class="currentUser">
      <h1>Bonjour {{currentUser.pseudo}}</h1>
      <div class="userIcon">
        <fa icon="user" />
      </div>
    </div>
    <div class="postContainer">
      <div v-for="post in posts.slice().reverse()" :key="post.id" class="posts">
        <div class="post-title">
          <h2>{{post.title}}</h2>
          <div class="postDetails">
          <p>Crée le
          {{ post.createdAt.split("T")[0].split("-").reverse().join("/") + ", à " + post.createdAt.split("T")[1].split(":").slice(0,-1).join(":") }}
          </p>
          <p>Auteur : {{post.author}} </p>
          </div>
        </div>
        <div v-if="post.imageUrl" class="post-img">
            <img :src="post.imageUrl" alt="image du post">
        </div>
        <div class="post-content">
          <p>{{post.content}}</p>
          <div class="button">
              <button v-if="currentUser.id == post.user_id" @click="editPost(post.id)">
              <div class="iconBtn">
                <fa icon="feather"/>
              </div>
              <p v-if="$screen.width >= 1024" >Editer le post</p>
            </button>
            <button v-if="currentUser.id == post.user_id || currentUser.role == true" @click="deletePost(post.id)">
              <div class="iconBtn">
                <fa icon="trash"/>
              </div>
              <p v-if="$screen.width >= 1024">Supprimer le post</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>Page width is {{ $screen.width }} px</p>
    <p>Page height is {{ $screen.height }} px</p>
    <p>Current breakpoint is {{ $screen.breakpoint }} px</p> -->
  </div>
</template>

<script>

import postServices from '@/services/posts.js'

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
    toggleModale(){
      this.revele = !this.revele;
    },
    editPost(id){
      this.$router.push({ path: "post", query: { edit: 1, id: id }})
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

.containerMobile {
  padding: 0.5rem;
}

.currentUser {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.5rem;
  h1 {
    font-size: 1.3rem;
  }
  .userIcon {
    font-size: 1.2rem;
    margin-left: 1rem;
    color:#1976d2;
  }
}

.postContainer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .posts {
    border-radius: 1rem;
    box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.74);
    -webkit-box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.50);
    -moz-box-shadow: 1px 9px 29px 6px rgba(145,145,145,0.50);
    .post-title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 1rem 1rem 0 0;
      padding: 1.2rem;
      background: #1976d2;
      color: white;
      gap: 0.3rem;
      h2 {
        font-size: 1.2rem;
        word-break: break-all;
      }
      .postDetails {
        display: flex;
        gap: 0.5rem;
      }
    }
    .post-content {
      background: #f1f1f1;
      border-radius: 0 0 1rem 1rem;
      padding: 1.5rem 1rem 1rem 1rem;
      p {
        font-size: 1.1rem;
        word-break: break-all;
      }
      .button {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #1976d2 ;
          color: white;
          border-radius: 8px;
          border: none;
          padding: 0.3rem 0.7rem;
          transition: 0.4s background-color;
          p {
            word-break: unset;
          }
          .iconBtn {
            display: flex;
            text-align: center;
            margin-right: 0.5rem;
            font-size: 0.9rem;
          }
          &:hover{
            cursor: pointer;
            background: #3da9fc;
          }
        }
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
}







</style>
