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
          <p>Auteur - {{post.username}} </p>
          </div>
          <div class="postTitleButton">
            <button type="button" class="postTitle__button" v-if="currentUser.id == post.user_id" @click="editPost(post.id)">
              <div class="iconBtnTitle">
                <fa icon="feather"/>
              </div>
              <p v-if="$screen.width >= 769">Editer le post</p>
            </button>
            <button type="button" class="postTitle__button" v-if="currentUser.id == post.user_id || currentUser.role == true" @click="deletePost(post.id)">
              <div class="iconBtnTitle">
                <fa icon="trash"/>
              </div>
              <p v-if="$screen.width >= 769">Supprimer le post</p>
            </button>
          </div>
        </div>
        <div v-if="post.imageUrl" class="post-img">
          <img :src="post.imageUrl" alt="image du post">
        </div>
        <div class="postContent">
          <p class="postContent__p">{{post.content}}</p>
            <div class="buttonComment">
              <button class="postContent__button" type="button" @click="newComment = 1, disableTextArea = 1, currentPost = post.id">
                <div class="iconBtnLarge">
                  <fa icon="comment"/>
                </div>
                <p>Nouveau commentaire</p>
              </button>
            </div>
          <div v-if="newComment == 1 && post.id == currentPost && disableTextArea == 1" class="textArea" @keyup.enter="createComment(post.id)" @keyup.escape="disableTextArea = 0">
              <textarea v-model="content" name="newComment"></textarea>
            </div>
          <div  class="commentContent" v-if="post.Comments.length > 0"> 
            <div v-for="comment in post.Comments.slice(0, commentsLimit)" :key="comment.id" class="comments">
              <div class="commentTitle">
                  <p class="commentTitle__p">Auteur: {{comment.username}}, Crée le: {{comment.createdAt.split("T")[0].split("-").reverse().join("/") + ", à " + comment.createdAt.split("T")[1].split(":").slice(0,-1).join(":")}}</p>
                <button type="button" v-if="currentUser.id == comment.user_id" @click="deleteComment(comment.id)">
                  <div class="iconBtn">
                    <fa icon="trash"/>
                  </div>
                </button>
              </div>
              <p class="comments__p"> {{comment.content}}</p>
            </div>
            <div class="buttonComment">
              <button type="button" class="commentContent__button" v-if="post.Comments.length > commentsLimit" @click="showMoreComments(post.Comments.length)">
                <div class="iconBtnLarge">
                  <fa icon="chevron-down"/>
                </div>
                  <p>Afficher plus de commentaires</p>  
              </button>
              <button type="button" class="commentContent__button" v-if="post.Comments.length > 3 && showComments == 1" @click="showLessComments()">
                <div class="iconBtnLarge">
                  <fa icon="chevron-up"/>
                </div>
                <p>Réduire les commentaires</p>
              </button> 
            </div>
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
    margin-top: 0.2rem;
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
        word-break: break-word;
      }
      .postDetails {
        display: flex;
        gap: 0.5rem;
      }
      .postTitleButton {
        margin-top: 0.4rem;
        justify-content: center;
        display: flex;
        gap: 2rem;

        .iconBtnTitle {
          font-size: 1rem;
          background: white;
          color: #1976d2;
          padding: 0.3rem 0.7rem;
          border-radius: 1rem;
        }
      }
      &__button{
      background: white;
      color: black;
      padding-right: 0.7rem;
      font-size: 1rem;
      transition: all 200ms ease-in;
      transform: scale(1);
      width: 12rem;
        &:hover {
        cursor: pointer;
        transition: all 200ms ease-in;
        transform: scale(1.1);
        }
      }
    }

    .postContent {
      border-radius: 0 0 1rem 1rem;
      padding: 1.5rem 1rem 1rem 1rem;
      &__p {
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 1rem;
        word-break: break-word;
        margin-bottom: 1rem;
      }
      .buttonComment {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      &__button {
        width: 100%;
        padding: 0.3rem 0.7rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        p {
          word-break: unset;
          margin: 0;
        }
        &:hover{
          cursor: pointer;
          background: #3da9fc;
        }
      }
      .textArea{
        textarea{
          margin: 1rem 0;
          resize: none;
          width: 100%;
        }
      }
      .commentContent {
        background: #dfdfdf98;
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        gap: 1rem;
        .comments {
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          background-color: white;
          border-radius: 1rem; 
          padding: 0.6rem 1rem;
          &__p {
            word-break: break-word;
          }
          .commentTitle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &__p {
              display: flex;
              flex-direction: row;
              margin: 0 0.8rem 0rem 0;
              font-size: 1rem;
              color: rgb(85, 85, 85)
            }
            button {
              margin: 0;
              padding: 0.3rem 0.7rem;
            }
          }
        }
        &__button {
          font-size: 1rem;
          width: 100%;
          padding: 0.3rem 0.7rem;
          margin: 0;
        }
      }
    }
    .post-img{
      display: flex;
      img {
      max-height: 18rem;
      width: 100%;
      object-fit: cover;
      object-position: center;
      }
    }
  }
}

@media screen and (max-width: 1024px){
  .currentUser {
    margin: 2rem 0;
  }

  .postContainer {
    .posts {
      .postTitle {
        &__button {
          padding: 0;
        }
      }
      .postContent {
        .commentContent {
          &__button {
              width: 100%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px){
  .postContainer {
    .posts {
      .postTitle {
        &__button {
          width: 100%;
        }
      }
    }
  }
}

</style>