import { createStore } from 'vuex';
import { createDefaultProduct } from '../utils/model'

export default createStore({
    state: {
        sharedData: createDefaultProduct(),
        type: true
    },
    mutations: {
        setSharedData(state, data) {
            state.type = data.type;
            state.sharedData = data.product;
        },
    },
    actions: {
        updateSharedData({ commit }, data) {
            commit('setSharedData', data);
        },
    },
    getters: {
        getSharedData(state) {
            return {
                sharedData: state.sharedData,
                type: state.type
            };
        },
    },
});
