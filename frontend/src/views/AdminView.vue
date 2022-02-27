<template>
  <div class="container" v-if="currentUser">
    <div class="usersListTitle">
      <div class="icon">
        <fa icon="list"/>
      </div>
      <h1>Liste des utilisateurs</h1>
    </div>
    <div class="usersList">
      <div v-for="user in users" :key="user.id" class="user">
        <div class="lastName">
          <p>Nom de famille : {{user.nom}}</p>
        </div>
        <div class="firstName">
          <p>Prénom : {{user.prenom}}</p>
        </div>
        <div class="nickName">
          <p>Pseudo : {{user.pseudo}}</p> 
        </div>
        <div class="email">
          <p>E-mail : {{user.email}}</p> 
        </div>
        <div class="role">
          <p>Administrateur : {{user.role}}</p>
        </div>
        <div class="button" v-if="user.id != currentUser.id">
          <button type="button"  @click="updateRole(user.id, user.role)">
            <div class="iconBtn">
              <fa icon="user-pen"/>
            </div>
            <p>Modifier rôle</p>
          </button>
          <button type="button"  @click="deleteUserById(user.id)">
            <div class="iconBtn">
              <fa icon="trash"/>
            </div>
            <p>Supprimer compte</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import userServices from '@/services/users.js'

export default {
  name: 'AdminView',
  data() {
    return {
      users: [],
      newRole: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfos;
    }
  },
  methods: {
    getAllUsers() {
      userServices.getAllUsers()
      .then((res) => {
      console.log(res)
      this.users = res.data.data
      })
      .catch ((error) => {
      console.log(error)
      })
    },
    deleteUserById(id) {
      userServices.deleteUserById(id)
      .then((res) => {
        console.log(res)
        this.getAllUsers()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
    updateRole(id, role) {
      if (role == 1) {
        this.newRole = false
      } else if ( role == 0) {
        this.newRole = true
      } 
      let content = {
        role: this.newRole
      }
      userServices.updateRole(id, content)
      .then((res) => {
        console.log(res)
        this.getAllUsers()
      })
      .catch ((error) => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getAllUsers()
  },
  mounted() {
  if (!this.$store.state.loggedIn){
    this.$router.push('/login');
    }
  }
}

</script>

<style lang="scss" scoped>

.container {
  .usersListTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3rem 0 2rem 0 ;
    h1 {
      font-size: 1.2rem;
    }
    .icon {
      margin-right: 1rem;
    }
  }

  p {
    font-size: 1.1rem;
  }
  .user {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 1rem;
    margin: 1rem 0;
    background: #f1f1f1;
    padding: 1rem;
  }

  .button {
    display: flex;
    margin-top: 1rem;
    gap: 1rem;
    button {
      font-size: 1rem;
      padding: 0.3rem 0.7rem;
      p {
       font-size: 1rem;
        margin: 0;
      }
      .iconBtn {
        font-size: 0.9rem;
        margin-right: 0.5rem;
      }
    }
  }
}


</style>
