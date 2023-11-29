import axios from 'axios'

export default {
    
    state: {
        notes: []
    },
    actions: {
        async addNote(context, data) {
            await axios.post('/api/notes', {
                title: data.title,
                content: data.content
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
            await axios.get('/api/notes')
            .then((response) => {
                this.commit("updateNotes", response.data)
            })
            .catch((response) => {
                console.log('error: ', response)
            })
        },

        async removeNote(context, id) {
            console.log(`/api/notes/${id}`)
            await axios.delete(`/api/notes/${id}`)
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
        }
    }
}