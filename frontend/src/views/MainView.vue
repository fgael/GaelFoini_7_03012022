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
        <div class="postTitle">
          <h2>{{post.title}}</h2>
          <div class="postDetails">
          <p>Crée le
          {{ post.createdAt.split("T")[0].split("-").reverse().join("/") + ", à " + post.createdAt.split("T")[1].split(":").slice(0,-1).join(":") }}
          </p>
          <p>Auteur : {{post.username}} </p>
          </div>
        </div>
        <div v-if="post.imageUrl" class="post-img">
          <img :src="post.imageUrl" alt="image du post">
        </div>
        <div class="postContent">
          <p>{{post.content}}</p>
          <div class="button">
            <button type="button" v-if="currentUser.id == post.user_id" @click="editPost(post.id)">
              <div class="iconBtn">
                <fa icon="feather"/>
              </div>
              <p v-if="$screen.width >= 1024">Editer le post</p>
            </button>
            <button type="button" @click="newComment = 1, disableTextArea = 1, currentPost = post.id">
              <div class="iconBtn">
                <fa icon="comment"/>
              </div>
              <p v-if="$screen.width >= 1024">Nouveau commentaire</p>
            </button>
            <button type="button" v-if="currentUser.id == post.user_id || currentUser.role == true" @click="deletePost(post.id)">
              <div class="iconBtn">
                <fa icon="trash"/>
              </div>
              <p v-if="$screen.width >= 1024">Supprimer le post</p>
            </button>
          </div>
          <div  class="commentContent">
            <div v-if="newComment == 1 && post.id == currentPost && disableTextArea == 1" class="textArea" @keyup.enter="createComment(post.id)" @keyup.escape="disableTextArea = 0">
              <textarea v-model="content" name="newComment"></textarea>
            </div>
            <div v-for="comment in post.Comments.slice(0, commentsLimit)" :key="comment.id" class="comments">
              <div class="commentTitle">
                <p>Auteur : {{comment.username}}</p>
                <p>Crée le : {{comment.createdAt.split("T")[0].split("-").reverse().join("/") + ", à " + comment.createdAt.split("T")[1].split(":").slice(0,-1).join(":")}}</p>
                <button type="button" @click="deleteComment(comment.id)">
                  <div class="iconBtn">
                    <fa icon="trash"/>
                  </div>
                </button>
              </div>
              <p> {{comment.content}}</p>
            </div>
            <button type="button" v-if="post.Comments.length > commentsLimit" @click="showMoreComments(post.Comments.length)">
                <p>Afficher plus de commentaires</p>  
            </button>
            <button type="button" v-if="post.Comments.length > 3 && showComments == 1" @click="showLessComments()">
              <p>Réduire les commentaires</p>
            </button> 
          </div>
        </div>
      </div>
    </div>
    <!-- Display screen size indicator -->
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
      content: '',
      newComment: 0,
      currentPost: 0,
      disableTextArea: 0,
      commentsLimit: 3,
      showComments: 0,
    }
  },
  computed: {
  currentUser() {
    return this.$store.state.userInfos;
    }
  },
  methods: {
    getAllPosts() {
      postServices.getAllPosts()
      .then((res) => {
      console.log(res)
      this.posts = res.data.data
    })
    .catch ((error) => {
      console.log(error)
    })},
    editPost(id){
      this.$router.push({ path: "post", query: { edit: 1, id: id }})
    },
    deletePost(id){
      postServices.deletePost(id)
      .then((res) => {
        console.log(res)
        this.getAllPosts()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    createComment(id) {
      let content = {
        username: this.$store.state.userInfos.pseudo,
        user_id: this.$store.state.userInfos.id,
        content: this.content,
        PostId: id,
      }
      postServices.createComment(content)
      .then((res) => {
        console.log(res)
        this.newComment = 0;
        this.content = '';
        this.getAllPosts()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    deleteComment(id) {
      postServices.deleteComment(id)
      .then((res) => {
        console.log(res)
        this.getAllPosts()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    showMoreComments(allComments) {
      this.commentsLimit = allComments;
      this.showComments = 1;
    },
    showLessComments() {
      this.commentsLimit = 3;
      this.showComments = 0;
    }
  },
  mounted: function () {
    if (!this.$store.state.loggedIn){
      this.$router.push('/login');
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
    .postTitle {
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
    .postContent {
      border-radius: 0 0 1rem 1rem;
      padding: 1.5rem 1rem 1rem 1rem;
      p {
        font-size: 1.1rem;
        word-break: break-all;
      }
      .button {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #1976d2;
          color: white;
          border-radius: 8px;
          border: none;
          padding: 0.3rem 0.7rem;
          transition: 0.4s background-color;
          margin-bottom: 1rem;
          p {
            word-break: unset;
          }
          .iconBtn {
            display: flex;
            text-align: center;
            font-size: 0.9rem;
          }
          &:hover{
            cursor: pointer;
            background: #3da9fc;
          }
        }
      }
      .commentContent {
        background: #f5f5f5;
        border-radius: 1rem;
        padding: 1rem;
        textarea {
          margin: 1rem 0;
          resize: none;
          width: 100%;
        }
        .comments {
          p {
          border-bottom: 1px solid #9D9D9D;
          padding-bottom: 0.2rem;
          }   
          .commentTitle {
            display: flex;
            flex-grow: 1;
            align-items: center;
            p {
              display: flex;
              flex-grow: 1;
              margin: 0 0.5rem 0.2rem 0;
              font-size: 1rem;
              border: none;
            }
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #1976d2;
            color: white;
            border-radius: 8px;
            border: none;

            transition: 0.4s background-color;
            &:hover{
            cursor: pointer;
            background: #3da9fc;
            }
          }
        }
        button {
          margin: 0.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #1976d2;
          color: white;
          border-radius: 8px;
          border: none;
          padding: 0.3rem 0.7rem;
          transition: 0.4s background-color;
          p {
            font-size: 1rem;
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
