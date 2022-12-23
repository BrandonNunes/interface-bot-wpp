import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            sectionName: "",
            stringQrCode: "",
            statusConnection: "",
            connectionBot: ""
        }
    },
    mutations: {
        changeSectionName(state, data) {
            state.sectionName = data
        },
        changeStringQrCode(state, data) {
            state.stringQrCode = data
        },
        changeStatusConnection(state, data) {
            state.statusConnection = data
        },
        changeConnectionBot(state, data) {
            state.connectionBot = data
        }
    }
})

export default store;
