<script>
import Close from '../assets/icons/close.svg';
import Add from '../assets/icons/add.svg';


export default {
    name: 'NoteList-component',
    props: {
    
    },
    components: {
        Close,
        Add
    },
    methods: {
        openAddNoteModal() {
            this.$store.commit('setActiveModal', 'addNote');
        },
        removeNote(id) {
            this.$store.dispatch('removeNote', id)
        },
        getNotes() {
            this.$store.dispatch('fetchNotes')
        }
    },
    computed: {
        notes() {
            return this.$store.getters.getNotes;
        }
    },
    mounted() {
        this.getNotes()
    }
}
</script>

<template>
    <div class="note">
        <div class="container">
            <div class="note__list">
                <div class="note__item" v-for="note in notes" :key="note.id">
                    <div class="note__item-title">{{ note.title }}</div>

                    <div class="note__item-text">
                        {{ note.content}}
                    </div>

                    <div class="note__item-remove">
                        <button class="button green-light" @click="removeNote(note.id)">
                            <Close />
                            <span class="button__text">Удалить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="note__add">
            <button class="button green-light round" @click="openAddNoteModal()">
                <Add />
            </button>
        </div>
    </div>
</template>



<style scoped>

</style>
