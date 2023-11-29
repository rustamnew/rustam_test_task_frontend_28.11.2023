<script>
//import Logo from '../assets/icons/logo.svg';

export default {
    name: 'Input-component',
    components: {
        //Logo
    },
    props: {
        fieldName: String,
        fieldTitle: String,
        placeholder: String,
        errorText: String
    },
    methods: {
        inputChange() {
            this.$emit('changeEvent', this.input, this.fieldName)
        }
    },
    data() {
        return {
            input: ''
        }
    }
}
</script>

<template>


    <div class="input">
        <span class="input__title text-small">{{ fieldTitle }}</span>

        <textarea :class="''" :placeholder="placeholder" v-model="input" @input="inputChange" maxlength="500"></textarea>

        <span class="input__error text-small" v-if="errorText">{{ errorText }}</span>

        <span class="input__counter" v-if="input.length">{{ input.length }}/500</span>
    </div>
    
    
</template>



<style scoped>

</style>
