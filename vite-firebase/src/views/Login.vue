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
    <div class="title">
        <h1>Login</h1>
    </div>        
    <div class="card">        
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Email" v-model.trim="email">
            <input type="password" placeholder="Password" v-model.trim="password">
            <button type="submit" :disabled="userstor.loadingbtn">Logearse</button>                     
            <div class="question">
                <p>¿No tienes una cuenta?</p>                
                <router-link to="/register">Registrate</router-link>
            </div>
        </form>
    </div>    
</template>

<style scoped>

.title{
    margin: 2rem 0 1rem 0;
}

h1 {
  font-family: var(--fuente-principal);
  font-weight: var(--fuerte);
  letter-spacing: 4px;
  font-size: 3rem;
  margin: 0;
}

.card{
    background-color: white;
    padding: 1.5rem;
    border-radius: .5rem;
}

.question{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: rgb(84, 110, 255);
    font-family: var(--fuente-principal);
    font-weight: var(--fuerte);
    gap: .5rem;
}
input{
    display: block;
    padding: .8rem;
    margin: 1rem 0 2rem 0;
    border: .1rem solid rgb(84, 110, 255);
    border-radius: 5px;
    font-size: 1.2rem;
}
button{
    display: block;
    padding: .6rem 4rem;
    margin: 1rem auto;
    margin-top: 3rem;
    border: .1rem solid rgb(84, 110, 255);
    border-radius: 5px;
    font-size: 1.2rem;
    background-color: rgb(67, 95, 255);
    color: white;
    cursor: pointer;
}

button:hover{
    transition: .3s;
    background-color: white;
    color: rgb(67, 95, 255);
}

</style>