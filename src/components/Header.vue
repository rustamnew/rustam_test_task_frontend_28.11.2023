<script>
import Logo from '../assets/icons/logo.svg';
import Login from '../assets/icons/login.svg';
import User from '../assets/icons/user.svg';

export default {
    name: 'Header-component',
    components: {
        Logo,
        Login,
        User
    },
    methods: {
        openLoginModal() {
            this.$store.commit('setActiveModal', 'login');
        },
        logoutUser() {
            this.$store.dispatch('logoutUser')
        }
    },
    computed: {
        activeUser() {
            return this.$store.getters.getUser;
        }
    },
}
</script>

<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="header__logo">
                <Logo />
            </router-link>
            

            <div v-if="activeUser.email" class="header__user">
                <router-link to="/account">
                    <span class="link">{{ activeUser.email }}</span>

                    <div class="header__user-icon">
                        <User />
                    </div>
                </router-link>

                <div class="header__user-dropdown dropdown">
                    <div class="dropdown__decorative">
                        <div class="dropdown__decorative-triangle"></div>
                    </div>
                    
                    <div class="dropdown__button">
                        <a href="/" class="link text-small-bold" @click="logoutUser()">Выйти</a>
                    </div>
                </div>
            </div>

            <button v-if="!activeUser.email" class="button green-light" @click="openLoginModal()" >
                <Login />
                <span class="button__text">Вход</span>
            </button>
        </div>
        

        
    </header>
    
</template>



<style scoped>

</style>
