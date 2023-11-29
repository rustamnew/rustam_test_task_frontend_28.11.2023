<script>
import LoginModal from './forms/LoginModal.vue';
import RegisterModal from './forms/RegisterModal.vue';
import AddNoteModal from './forms/AddNoteModal.vue';

export default {
    name: 'modal-block',
    components: {
    LoginModal,
    RegisterModal,
    AddNoteModal
},
    computed: {
        activeModal() {
            return this.$store.getters.getActiveModal;
        }
    },
}
</script>

<template>
    <div class="modal">

        <LoginModal v-if="activeModal == 'login'"/>
        <RegisterModal v-if="activeModal == 'register'"/>
        <AddNoteModal v-if="activeModal == 'addNote'"/>
            
    </div>
    
</template>



<style scoped>

</style>
