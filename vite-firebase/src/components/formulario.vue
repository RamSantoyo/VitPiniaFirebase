<script setup>
import { useBasedatosStore } from '../store/basedatos'
import { ref } from 'vue';

const base = useBasedatosStore()
const url = ref('');

const submitform = () => {
    base.addurl(url.value)
}
</script>
<template>
    <form @submit.prevent="submitform">
        <input type="text" placeholder="Ingrese URL" v-model="url">
        <button type="submit">Agregar</button>
    </form>
</template>

<style lang="scss" scoped>

</style>