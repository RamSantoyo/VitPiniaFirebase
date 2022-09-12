<script setup>
import {userStore} from '../store/user'

const userstor = userStore();
</script>

<template>        
        <h1>Home</h1>
        <p>{{userstor.userData?.email}}</p>
        <p>{{userstor.userData?.uid}}</p>         
</template>

<style scoped>

</style>