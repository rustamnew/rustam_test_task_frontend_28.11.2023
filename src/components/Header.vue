<script>
import Logo from '../assets/icons/logo.svg';

export default {
    name: 'Header-component',
    components: {
        Logo
    }
}
</script>

<template>
    <div class="header">
        <Logo />

        <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">Вход</router-link>
    </nav>
    </div>
    
</template>



<style scoped>

</style>
