import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import {clearCookie} from "./util";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: false,
        IMGROOTURL: process.env.VUE_APP_imgUrl,
        _axiosPromiseCancel:[]
    },
    mutations: {
        loginIn(state) {
            state.auth = true;
            return router.push('/home')
        },
        loginOut(state) {
            state.auth = false;
            clearCookie('access_token');
            clearCookie('Authorization');
            return router.push('/login')
        },
    },
})
