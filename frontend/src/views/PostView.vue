<template>
<div class="container" v-if="currentUser">
  <form class="postForm">
          <div class="postTitle">
            <label for="postTitle">Titre</label>
            <input v-model="post.title" class="form-input" id="postTitle" type="text"/>
          </div>
          <div class="postContent">
            <label for="postContent">Contenu</label>
            <textarea v-model="post.content" class="form-input" id="postContent" />
          </div>
          <div class="postImg">
            <label for="postImg">Image</label>
            <input class="form-input" id="postImg" type="file" @change="imgUpload" />
          </div>
          <button @click="createPost()">Valider</button>
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
      let formData = new FormData()
      formData.append("user_id", this.$store.state.userInfos.id)
      formData.append("title", this.post.title)
      formData.append("content", this.post.content)
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
      return;
    }
  }
}

</script>

<style lang="scss" scoped>
.postTitle {
  display: flex;
  flex-direction: column;
  input {
    margin: 2rem 0;
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
}

.postImg {
  display: flex;
  flex-direction: column;
  input {
      margin: 1rem 0;
  }
}

img {
  border-radius: 50%;
  height: 4rem;
  margin-bottom: 2rem;
}

button {
  margin: 0 1rem 0 0;
}

</style>