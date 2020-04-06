import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        username: null,
        token: null,
        tenant_id:null
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.USERNAME]: (state, data) => {
            localStorage.username = data;
            state.username = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            state.token = null
        },[types.PROJECTID]: (state,data) => {
            localStorage.tenant_id = data;
            state.tenant_id = data;
        },
    }
})
