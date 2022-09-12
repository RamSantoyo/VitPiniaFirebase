<script setup>
import { RouterLink, RouterView} from 'vue-router'
import { userStore } from './store/user'

const userStor = userStore();

</script>

<template>
  <div>
    <nav v-if="!userStor.session">
      <ul>
        <li>
          <router-link v-if="userStor.userData" to="/">Home</router-link>
        </li>
        <li>
          <router-link v-if="!userStor.userData" to="/login">Login</router-link>|
        </li>
        <li>
          <router-link v-if="!userStor.userData" to="/register">Register</router-link>|
        </li>
      </ul>
      <button v-if="userStor.userData" @click="userStor.signOut">Logout</button>
    </nav>
    <div v-else>
      <p>Loading....</p>
    </div>    
  </div>
  <div>
      <router-view></router-view>
    </div>
</template>

<style coped>

</style>