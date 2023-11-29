<script>
import '@/scss/style.scss'

import Header from './components/Header.vue'
import Modal from './components/modals/Modal.vue'

//import { mapGetters } from 'vuex';

export default {
    name: 'App',
    components: {
        Header,
        Modal
    },
    
    computed: {
        activeModal() {
            return this.$store.getters.getActiveModal;
        }
    },

    methods: {
        getUser() {
            this.$store.dispatch('getUser')
        }
    },
    mounted() {
        this.getUser()
    }

}
</script>

<template>
  <div id="app">
    <Header />

    <main>
        <router-view/>
    </main>
    

    <Modal v-if="activeModal !== ''" />
  </div>
</template>

<style>

</style>
