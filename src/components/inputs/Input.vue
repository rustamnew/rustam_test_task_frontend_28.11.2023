<script>
import OnPassword from '../../assets/icons/on-password.svg';
import OffPassword from '../../assets/icons/off-password.svg';

export default {
    name: 'Input-component',
    components: {
        OnPassword,
        OffPassword
    },
    props: {
        fieldType: String,
        fieldName: String,
        fieldTitle: String,
        placeholder: String,
        errorText: String
    },
    methods: {
        inputChange() {
            this.$emit('changeEvent', this.input, this.fieldName)
        },
        changePasswordMode() {
            if (this.fieldMode == 'password') {
                this.fieldMode = 'text'
            } else {
                this.fieldMode = 'password'
            }
            
        }
    },
    /*computed: {
        fieldTypeComputed() {
            return this.fieldType
        }
    },*/
    data() {
        let fieldMode = 'text'

        if (this.fieldType == 'password') {
            fieldMode = 'password'
        }

        return {
            input: '',
            fieldMode
        }
    }
}
</script>

<template>


    <div class="input">
        <span class="input__title text-small">{{ fieldTitle }}</span>

        <input :type="fieldMode" :class="'input-simple'" :placeholder="placeholder" v-model="input" @input="inputChange" maxlength="20">

        <div v-if="fieldType == 'password'" class="input__password-mode" @click="changePasswordMode()">
            <OnPassword v-if="fieldMode == 'password'"/>
            <OffPassword v-if="fieldMode == 'text'"/>
        </div>

        <span class="input__error text-small" v-if="errorText">{{ errorText }}</span>

        <span class="input__counter" v-if="input.length">{{ input.length }}/100</span>
    </div>
    
    
</template>



<style scoped>

</style>
