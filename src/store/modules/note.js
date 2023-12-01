import axios from 'axios'

export default {
    
    state: {
        notes: []
    },
    actions: {
        async addNote(context, data) {
            let token = this.getters.getUserToken

            if (!token && localStorage.testUserAccessToken) {
                token = localStorage.testUserAccessToken
            }

            await axios.post('proxy.php', {
                title: data.title,
                content: data.content
            }, {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/notes',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((/*response*/) => {
                this.dispatch("fetchNotes")
                this.commit("closeModal")
            })
            .catch((response) => {
                console.log('error: ', response)
            })
        },

        async fetchNotes(/*context*/) {
            let token = this.getters.getUserToken

            if (!token && localStorage.testUserAccessToken) {
                token = localStorage.testUserAccessToken
            }
            await axios.get('proxy.php', {
                headers: {
                    'x-proxy-url': 'https://dist.nd.ru/api/notes',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.commit("updateNotes", response.data)
            })
            .catch((response) => {
                console.log('error: ', response)
            })
        },

        async removeNote(context, id) {
            let token = this.getters.getUserToken

            if (!token && localStorage.testUserAccessToken) {
                token = localStorage.testUserAccessToken
            }

            await axios.delete(`proxy.php`, {
                headers: {
                    'x-proxy-url': `https://dist.nd.ru/api/notes/${id}`,
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((/*response*/) => {
                this.dispatch("fetchNotes")
            })
            .catch((response) => {
                console.log('error: ', response)
            })
        }
    },
    mutations: {
        updateNotes(state, notes) {
            state.notes = notes
        }
    },
    getters: {
        getNotes(state) {
            return state.notes
        },
    }
}