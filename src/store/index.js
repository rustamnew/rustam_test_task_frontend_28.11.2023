import Vue from "vue";
import Vuex from "vuex";

import note from './modules/note'
import modal from './modules/modal'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        note,
        modal,
        user
    }
})