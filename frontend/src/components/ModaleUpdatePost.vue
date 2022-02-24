<template>
  <div class="bloc-modale" v-if="revele">
  <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale">
    <div @click="toggleModale" class="btn-modale">X</div>
      <h2>Editer votre post</h2>
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
        <div>
          {{post}}
        </div>
        <button @click="updatePost()">Valider</button>
      </form>
    </div>
  </div>
</template>

<script>

import postServices from '@/services/posts.js'

export default {
  name: "ModaleUpdatePost",
  props: ['revele', 'toggleModale'],
  data() {
    return {
      post: {},
    }
  },
  methods: {
   updatePost(id){
      postServices.updatePost(id)
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
    }
  }
}

</script>


<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 1.5rem;
  position: fixed;
  top: 30%;
  max-width: 60vh;
  border-radius: 1rem;
}

.btn-modale {
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;
  background: red;
  padding: 0.2rem;
  border-radius: 0.3rem;
}

h2 {
  margin: 1rem 0 1rem 0;
}

label {
  margin-right: 0.5rem;
}
</style>