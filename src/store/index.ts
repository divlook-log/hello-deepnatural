import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myCoin: 21000,
    },
    mutations: {
        increaseMyCoin(state, coin: number) {
            state.myCoin += coin
        }
    },
    actions: {},
    modules: {},
})
