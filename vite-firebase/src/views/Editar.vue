<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import { useBasedatosStore } from '../store/basedatos'
import { ref } from 'vue';

const route = useRoute();
const { id } = route.params;

const data = useBasedatosStore();

const url = ref('');

onMounted( async() => {
    url.value = await data.leerurl(id);
})

const editar = () => {
    data.update(id, url.value)
}

</script>

<template>
    <div>
        <h1>hola soy editar</h1>
        <form @submit.prevent="editar">
            <input type="text" placeholder="Editar URL" v-model="url">
            <button type="submit">Editar url</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>