import axios from "axios";
import store from "./../store";
import {getCookie} from './../util/index'
import {Message, Loading} from 'element-ui'

const CancelToken = axios.CancelToken;
let loadingInstance;
import {axiosPromiseCancel, axiosPromisePrev} from "../axiosPromise";

const Axios = axios.create({
    timeout: 8000, responseType: "json", headers: {
        "Content-Type": "application/json; charset=UTF-8",
    }, withCredentials: true,
});
Axios.interceptors.request.use(config => {
    let c = null;
    config.cancelToken = new CancelToken(cancel => {
        c = cancel;
        axiosPromiseCancel.push(cancel);
    });
    config.url + config.method === axiosPromisePrev ? axiosPromisePrev.cancel() : '';
    loadingInstance = Loading.service({fullscreen: true, lock: true});
    if (getCookie('Authorization')) {
        config.headers.common['Authorization'] = getCookie('Authorization');
    }
    axiosPromisePrev.tag = config.url + config.method;
    axiosPromisePrev.cancel = c;
    return config;
});

Axios.interceptors.response.use(response => {
    loadingInstance && loadingInstance.close();
    if (response.data && (response.status === 403 || response.status === 401)) {
        Message.warning(response.data.msg);
        store.commit("loginOut");
        loadingInstance && loadingInstance.close();
        return false;
    } else if (response.status === 200) {
        if (response.config.url.includes('/oauth/') && response.data.code === undefined) {
            loadingInstance && loadingInstance.close();
            return response.data;
        }
        if (response.data.code === 0 && response.data.data) {
            loadingInstance && loadingInstance.close();
            return response.data.data;
        }
        Message.error(response.data.msg);
        return Promise.reject(response.data.msg);
    } else {
        Message.warning(response.data.message || response.data.msg);
        return Promise.reject(response.data.message || response.data.msg);
    }
}, error => {
    loadingInstance && loadingInstance.close();
    return Promise.reject(error.toString());
});

export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$axios", {value: Axios});
    }
};