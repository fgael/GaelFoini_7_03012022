<template>
  <div class="container" v-if="currentUser">
    <form class="postForm">
      <div class="postTitle">
        <label for="postTitle">Titre</label>
        <input v-model="post.title" class="form-input" id="postTitle" type="text" />
      </div>
      <div class="postContent">
        <label for="postContent">Contenu</label>
        <textarea v-model="post.content" class="form-input" id="postContent" />
      </div>
      <div class="postImg">
        <label for="postImg">Image</label>
        <input class="form-input" id="postImg" type="file" @change="imgUpload" />
      </div>
      <button :disabled="!this.post.title && !this.post.content && !this.postImg" 
              :class="{'button--disabled' : !this.post.title && !this.post.content && !this.postImg}"
              type="button" @click="createPost()">
        <div class="iconBtn">
          <fa icon="square-check"/>
        </div>
        <p>Valider</p>
      </button>
    </form>
  </div>
</template>

<script>

import postServices from '@/services/posts.js'

export default {
  name: 'PostView',
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  data() {
    return {
        post: {},
        postImg:'',
        control: 0,
    }
  },
  methods: {
    createPost() {
      // Edition post
      let edit = this.$route.query.edit
      let id = this.$route.query.id
      if (edit == 1){
          let formData = new FormData()
          if (this.post.title) {
            formData.append("title", this.post.title)
          }
          if (this.post.content) {
            formData.append("content", this.post.content)
          }
          if (this.control ==1 && this.post.Img) {
            formData.append("file", this.postImg, this.postImg.name)
          }
          formData.append("user_id", this.$store.state.userInfos.id)
          formData.append("username", this.$store.state.userInfos.pseudo)
        postServices.updatePost(id, formData)
        .then((res) => {
          console.log(res)
          this.control = 0
          this.$router.push("/")
        })
        .catch ((error) => {
          console.log(error)
        })
      } else {
        // Creation post
         if (!this.post.title){
            this.post.title = ""
          }
          if (!this.post.content){
            this.post.content = ""
          }
        let formData = new FormData()
          formData.append("user_id", this.$store.state.userInfos.id)
          formData.append("title", this.post.title)
          formData.append("content", this.post.content)
          formData.append("username", this.$store.state.userInfos.pseudo)
        if (this.control == 1) {
          formData.append("file", this.postImg, this.postImg.name)
        }
        postServices.createPost(formData)
        .then((res) => {
          console.log(res)
          this.control = 0;
          this.$router.push("/")
        })
        .catch ((error) => {
          console.log(error)
        })
      }
    },
    imgUpload(e) {
    this.control = 1;
    const file = e.target.files[0];
    this.postImg = file;
    }
  },
  mounted: function () {
    if (!this.$store.state.loggedIn){
    this.$router.push('/login');
    }
  }
}

</script>

<style lang="scss" scoped>

.container {
  padding: 1.5rem;
  .postForm {
    .postTitle {
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;
      label {
        font-size: 1.1rem;
      }
      input {
        margin: 2rem 0;
        height: 2rem;
        padding: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid black;
        &:focus-visible {
          outline: 2px solid #1976d2;
          border-radius: 0.5rem;
          border: none;
        }
      }
    }
    .postContent {
      display: flex;
      flex-direction: column;
      textarea {
        margin: 2rem 0;
        height: 20rem;
        padding: 0.5rem;
        resize: none;
      }
      label {
        font-size: 1.1rem;
      }
    }
    .postImg {
      display: flex;
      flex-direction: column;
      input {
        margin: 1rem 0;
        font-size: 1rem;
      }
      label {
        font-size: 1.1rem;
      }
    }
    button {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1976d2 ;
      color: white;
      border-radius: 8px;
      border: none;
      font-size: 1rem;
      padding: 0.3rem 0.7rem;
      transition: 0.4s background-color;
      &:hover{
        cursor: pointer;
        background: #3da9fc;
      }
      p {
        margin: 0;
        font-size: 0.9rem;
      }
      .iconBtn {
        margin-right: 0.5rem;
      }
    }
    .button--disabled {
      background: #cecece;
      color: #ececec;
      &:hover {
        cursor: not-allowed;
        background: #cecece;
      }
    }
  }
} 

@media screen and (max-width: 768px){
  .container {
    padding: 1rem;
  }
  .postForm {
    .postContent {
      height: 15rem;
    }
  }
}


</style>