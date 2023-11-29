export default {
    state: {
        activeModal: ''
    },
    getters: {
        getActiveModal(state) {
            return state.activeModal
        },
    },
    mutations: {
        setActiveModal(state, modal_type) {
            state.activeModal = modal_type
        },
        closeModal(state) {
            state.activeModal = ''
            this.commit('updateErrorText', '')
        }
    }
}