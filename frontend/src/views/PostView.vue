<template>
<div class="container" v-if="currentUser">
  <form class="postForm">
          <div class="postTitle">
            <label for="postTitle">Titre</label>
            <input v-model="post.title" class="form-input" id="postTitle" type="text"/>
          </div>
          <div class="postContent">
            <label for="postContent">Contenu</label>
            <input v-model="post.content" class="form-input" id="postContent" type="text" />
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
    }
  },
  methods: {
    createPost() {
      let formData = new FormData()
      formData.append("file", this.postImg, this.postImg.name)
      formData.append("user_id", this.$store.state.userInfos.id)
      formData.append("title", this.post.title)
      formData.append("content", this.post.content)
      postServices.createPost(formData)
      .then((res) => {
        console.log(res)
        this.$router.push("/")
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    imgUpload(e) {
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

img {
  border-radius: 50%;
  height: 4rem;
  margin-bottom: 2rem;
}

button {
  margin: 0 1rem 0 0;
}

</style>