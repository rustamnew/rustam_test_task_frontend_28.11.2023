<script>
import Close from '../../../assets/icons/close.svg';
import Input from '../../inputs/Input.vue';

export default {
    name: 'modal-register',
    components: {
        Close,
        Input
    },
    methods: {
        closeModal() {
            this.$store.commit('closeModal');
        },
        changeToLoginModal() {
            this.$store.commit('setActiveModal', 'login');
        },
        handleInputChange(value, fieldName) {
            this.formData[fieldName] = value

            this.checkField(fieldName)
        },
        
        sendRegisterRequest(data) {
            this.$store.dispatch('registerUser', data)
        },
        
        submitForm(event) {
            event.preventDefault();

            this.checkAllFields()

            if (!this.errorMessages.email && !this.errorMessages.password) {
                this.sendRegisterRequest(this.formData)
            }
        },

        checkAllFields() {
            if (this.formData.email == '') {
                this.errorMessages.email = 'Пустое поле'
            } else {
                this.errorMessages.email = ''
            }

            if (this.formData.password == '') {
                this.errorMessages.password = 'Пустое поле'
            } else {
                this.errorMessages.password = ''
            }

            if (this.formData.confirm_password == '') {
                this.errorMessages.confirm_password = 'Пустое поле'
            } else {
                this.errorMessages.confirm_password = ''
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
                email: '',
                password: '',
                confirm_password: '',
            },
            errorMessages: {
                email: '',
                password: '',
                confirm_password: ''
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

        <h2 class="modal__title">Регистрация</h2>

        <div class="modal__inputs">
            <Input 
            v-on:changeEvent="handleInputChange" 
            fieldType="email" 
            fieldName="email"
            placeholder="Введите Email"
            fieldTitle="Email"
            :errorText="errorMessages.email"
            />

            <Input  
            v-on:changeEvent="handleInputChange" 
            fieldType="password" 
            fieldName="password"
            placeholder="Пароль"
            fieldTitle="Пароль"
            :errorText="errorMessages.password"
            />

            <Input 
            v-on:changeEvent="handleInputChange" 
            fieldType="password" 
            fieldName="confirm_password"
            placeholder="Пароль ещё раз"
            fieldTitle="Пароль ещё раз"
            :errorText="errorMessages.confirm_password"
            />
        </div>

        <div class="modal__controls">
            <div class="modal__account-question">
                <span class="text-small">У вас есть аккаунт? </span>
                <a href="#" class="link text-small-bold" @click="changeToLoginModal()">Войдите</a>
            </div>

            <button class="button green-light" @click="submitForm($event)">Зарегистрироваться</button>
        </div>

        <template v-if="errorText && (typeof errorText !== 'string')">
            <div class="modal__error" v-for="error in errorText" :key="error">{{ error }}</div>
        </template>
        <template v-else-if="errorText">
            <div class="modal__error">{{ errorText }}</div>
        </template>
        
    </div>
        
</template>



<style scoped>

</style>
