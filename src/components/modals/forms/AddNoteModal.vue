<script>
import Close from '../../../assets/icons/close.svg';
import Input from '../../inputs/Input.vue';
import Textarea from '../../inputs/Textarea.vue';

export default {
    name: 'modal-addNote',
    components: {
        Close,
        Input,
        Textarea
    },
    methods: {
        closeModal() {
            this.$store.commit('closeModal');
        },

        handleInputChange(value, fieldName) {
            this.formData[fieldName] = value

            this.checkField(fieldName)
        },
        
        sendAddNoteRequest(data) {
            this.$store.dispatch('addNote', data)
        },
        

        submitForm(event) {
            event.preventDefault();
            
            this.checkAllFields()

            if (!this.errorMessages.email && !this.errorMessages.password) {
                this.sendAddNoteRequest(this.formData)
            }
        },

        checkAllFields() {
            if (this.formData.title == '') {
                this.errorMessages.title = 'Пустое поле'
            } else {
                this.errorMessages.title = ''
            }


            if (this.formData.content == '') {
                this.errorMessages.content = 'Пустое поле'
            } else {
                this.errorMessages.content = ''
            }
        },

        checkField(fieldName) {
            if (this.formData[fieldName] == '') {
                this.errorMessages[fieldName] = 'Пустое поле'
            } else {
                this.errorMessages[fieldName] = ''
            }
        }
    },
    data() {
        return {
            formData: {
                title: '',
                content: ''
            },
            errorMessages: {
                title: '',
                content: ''
            }
        }
    },
    computed: {
        errorText() {
            return this.$store.getters.getErrorText;
        }
    },
}
</script>

<template>
    
    <div class="modal__content">
        <div class="modal__close"> 
            <button class="button round" @click="closeModal()"><Close /></button>  
        </div>

        <h2 class="modal__title">Добавление заметки</h2>

        <div class="modal__inputs">
            <Input 
            v-on:changeEvent="handleInputChange" 
            fieldType="text" 
            fieldName="title"
            placeholder="Введите название"
            fieldTitle="Название заметки"
            :errorText="errorMessages.title"
            />

            <Textarea  
            v-on:changeEvent="handleInputChange" 
            fieldType="text" 
            fieldName="content"
            placeholder="Введите текст"
            fieldTitle="Текст заметки"
            :errorText="errorMessages.content"
            />

        </div>

        <div class="modal__controls">

            <button class="button green-light" @click="submitForm($event)">Добавить</button>
        </div>
        
    </div>
        
</template>



<style scoped>

</style>
