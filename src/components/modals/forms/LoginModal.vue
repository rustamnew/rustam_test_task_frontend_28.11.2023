<script>
import Close from '../../../assets/icons/close.svg';
import Input from '../../inputs/Input.vue';

export default {
    name: 'modal-login',
    components: {
        Close,
        Input
    },
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            errorMessages: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        errorText() {
            return this.$store.getters.getErrorText;
        }
    },
    methods: {
        closeModal() {
            this.$store.commit('closeModal');
        },
        changeToRegisterModal() {
            this.$store.commit('setActiveModal', 'register');
        },
        handleInputChange(value, fieldName) {
            this.formData[fieldName] = value
            this.checkField(fieldName)
        },
        
        sendLoginRequest(data) {
            this.$store.dispatch('loginUser', data)
        },
        
        submitForm(event) {
            event.preventDefault();

            this.checkAllFields()

            if (!this.errorMessages.email && !this.errorMessages.password) {
                this.sendLoginRequest(this.formData)
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
        },

        checkField(fieldName) {
            if (this.formData[fieldName] == '') {
                this.errorMessages[fieldName] = 'Пустое поле'
            } else {
                this.errorMessages[fieldName] = ''
            }
        }
    }
}
</script>

<template>
    
    <div class="modal__content">
        <div class="modal__close"> 
            <button class="button round" @click="closeModal()"><Close /></button>  
        </div>

        <h2 class="modal__title">Вход в ваш аккаунт</h2>

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

        </div>

        <div class="modal__controls">
            <div class="modal__account-question">
                <span class="text-small">У вас нет аккаунта? </span>
                
                <a href="#" class="link text-small-bold" @click="changeToRegisterModal()">Зарегистрируйтесь</a>
            </div>

            <button class="button green-light" @click="submitForm($event)">Войти</button>
        </div>

        <template v-if="errorText && (typeof errorText !== 'string')">
            <div class="modal__error" v-for="error in errorText" :key="error">{{ error }}</div>
        </template>
        <template v-else-if="errorText">
            <div class="modal__error">{{ errorText }}</div>
        </template>
        
    </div>
        
</template>

