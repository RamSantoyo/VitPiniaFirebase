<script setup>
import { ref } from 'vue'
import {userStore} from '../store/user'
import {useRouter} from 'vue-router'

//mandar llamar la funcion de login
const userstor = userStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    if (!email.value || !password.value || password.value.length < 6) {
        return alert('Llena los campos')
    }
    await userstor.loginUser(email.value, password.value);
}

</script>

<template>        
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Email" v-model.trim="email">
            <input type="password" placeholder="Password" v-model.trim="password">
            <button type="submit" :disabled="userstor.loadingbtn">Registrar</button>
        </form>
    </div>

</template>

<style scoped>

</style>