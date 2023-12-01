import axios from 'axios'
import router from '@/router'

export default {
    
    state: {
        user: {},
        errorText: ''
    },
    actions: {
        async registerUser(context, data) {
            await axios.post('proxy.php', {
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password,
            }, {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/reg'
                }
            })
            .then((/*response*/) => {
                this.dispatch("loginUser", {
                    email: data.email,
                    password: data.password
                })
                this.commit("closeModal")
            })
            .catch((response) => {
                context.commit('updateErrorText', response.response.data.message)
            })
        },

        async loginUser(context, data) {
            await axios.post('proxy.php', {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/auth',
                }
            })
            .then((response) => {
                localStorage.testUserAccessToken = response.data.accessToken

                context.commit('updateUser', {
                    email: data.email,
                    id: data.id,
                    token: response.data.accessToken
                })
                context.commit('updateErrorText', '')

                this.commit("closeModal")

                router.push('account')
            })
            .catch((response) => {
                context.commit('updateErrorText', response.response.data.message)
            })
        },

        async getUser(context) {
            let token = this.getters.getUserToken

            if (!token && localStorage.testUserAccessToken) {
                token = localStorage.testUserAccessToken
            }
            await axios.get('proxy.php', {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/auth',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                context.commit('updateUser', response.data)
            })
            .catch((response) => {
                console.log('error: ', response)
            })
        },

        async logoutUser(context) {
            let token = this.getters.getUserToken

            if (!token && localStorage.testUserAccessToken) {
                token = localStorage.testUserAccessToken
            }

            localStorage.testUserAccessToken = ''
            
            await axios.delete('/api/auth', {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/auth',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((/*response*/) => {
                
                context.commit('updateUser', {})
            })
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        },
        updateErrorText(state, errorText) {
            state.errorText = errorText
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getErrorText(state) {
            return state.errorText
        },
        getUserToken(state) {
            return state.user.token
        }
    }
}