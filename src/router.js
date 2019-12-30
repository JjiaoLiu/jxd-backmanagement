import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store'
import {getCookie} from "./util";
import {axiosPromiseCancel} from './axiosPromise'

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home',
            exact: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            component: () => import('./views/Home.vue'),
            beforeEnter: (to, from, next) => {
                if (store.state.auth || getCookie('access_token')) {
                    next()
                } else {
                    next({path: '/login'})
                }
            },
            children: [{
                path: 'jobTypes',
                component: () => import('./views/JobTypes.vue')
            }, {
                path: 'jobExamine',
                component: () => import('./views/JobExamine.vue')
            }, {
                path: 'jobInfos',
                component: () => import('./views/JobInfos.vue')
            }, {
                path: 'jobInfos/jobInfo',
                component: () => import('./views/JobInfo.vue')
            }, {
                path: 'jobExamine/jobInfo',
                component: () => import('./views/JobInfo.vue')
            }, {
                path: 'codeTabel',
                component: () => import('./views/CodeTabel.vue')
            }, {
                path: 'coInfos',
                component: () => import('./views/CoInfos.vue')
            }, {
                path: 'coExamine',
                component: () => import('./views/CoExamine.vue')
            }, {
                path: 'coInfos/coInfo',
                component: () => import('./views/CoInfo.vue')
            }, {
                path: 'coExamine/coInfo',
                component: () => import('./views/CoInfo.vue'),
            }, {
                path: 'coMembers',
                component: () => import('./views/CoMembers.vue'),
            }, {
                path: 'coMembers/coMember',
                component: () => import('./views/CoMember.vue'),
            }, {
                path: 'appImage',
                component: () => import('./views/AppImage.vue'),
            }, {
                path: 'hotResearch',
                component: () => import('./views/HotResearch.vue'),
            }, {
                path: 'resume',
                component: () => import('./views/Resume.vue'),
            }, {
                path: 'resume/resumeInfo',
                component: () => import('./views/ResumeInfo.vue'),
            }, {
                path: 'jobResume',
                component: () => import('./views/JobResume.vue'),
            }, {
                path: 'jobProgress',
                component: () => import('./views/JobProgress.vue'),
            }, {
                path: 'appVersion',
                component: () => import('./views/AppVersion.vue'),
            }, {
                path: 'users',
                component: () => import('./views/Users.vue'),
            }, {
                path: 'withdraw',
                component: () => import('./views/Withdraw.vue'),
            }, {
                path: 'complaints',
                component: () => import('./views/Complaints.vue'),
            }, {
                path: 'trades',
                component: () => import('./views/Trades.vue'),
            }, {
                path: 'rejectJob',
                component: () => import('./views/RejectJob.vue'),
            }, {
                path: 'users/user',
                component: () => import('./views/User.vue'),
            }, {
                path: 'breaches',
                component: () => import('./views/Breaches.vue'),
            }, {
                path: 'activity/activityRescuePlan',
                component: () => import('./views/ActivityRescuePlan.vue'),
            }]
        }
    ],
});

router.beforeEach(async function (to, from, next)  {
    let cancelArr = axiosPromiseCancel;
    cancelArr.forEach((ele, index) => {
        ele("取消了请求");
        delete axiosPromiseCancel[index]
    });
    next()
});
export default router