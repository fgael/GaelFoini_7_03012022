<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale">
      <div @click="toggleModale" class="btn-modale">X</div>
      <h2>Créer un post</h2>
      <div class="form-group">
        <form class="postForm">
          <div class="postTitle">
            <label for="postTitle">Titre</label>
            <input v-model="post.title" class="form-input" id="postTitle" type="text"/>
          </div>
          <div class="postContent">
            <label for="postContent">Contenu</label>
            <input v-model="post.content" class="form-input" id="postContent" type="text" />
          </div>
          <!-- <div class="postImg">
            <label for="postImg">Image</label>
            <input class="form-input" id="postImg" type="file" />
          </div> -->
          <button @click="createPost()">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

import postServices from '@/services/posts.js'

export default {
  name: "ModalePost",
  props: ['revele', 'toggleModale'],
  data() {
    return {
      post: {},
    }
  },
  methods: {
    createPost() {
      let post = {
        user_id: this.$store.state.userInfos.id,
        title: this.post.title,
        content: this.post.content,
        imageUrl: "pouet",
      }
      postServices.createPost(post)
      .then((res) => {
        console.log(res)
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
  background: rgba(0, 0, 0, 0.5);
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
  width: 40vh;
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