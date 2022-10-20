<script setup>
import {userStore} from '../store/user'
import { useBasedatosStore } from '../store/basedatos'
import formulario from '../components/formulario.vue'
import { RouterLink } from 'vue-router'

const base = useBasedatosStore()
const userstor = userStore();


base.getbd()

</script>

<template>
        <div v-if="base.loading">
                <p>Loading data....</p>
        </div>        
        <div v-else> 
                <h1>Registros</h1>                        
                <formulario/>
                
                <div v-for="(item, index) in base.documents" :key="index">
                        <p>
                                {{item.name}}<br>{{item.short}}<br>{{item.user}}   
                        </p>
                        <button @click="base.deleteurl(item.id)">Eliminar</button>
                        <router-link :to="'/editar/'+item.id">Editar</router-link>
                </div>
                
        </div>             
</template>

<style scoped>

h1 {
  font-family: var(--fuente-principal);
  font-weight: var(--fuerte);
  letter-spacing: .5rem;
  font-size: 2rem;
}

</style>