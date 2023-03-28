import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
          
            redirect: '/three01',
          
           
        },
        {
            path: '/three01',
            component:()=>import("../views/three01/index.vue")
        },
        {
            path: '/three02',
            component:()=>import("../views/three02/index.vue")
        },
        {
            path: '/three03',
            component:()=>import("../views/three03/index.vue")
        },
        {
            path: '/three04',
            component:()=>import("../views/three04/index.vue")
        },
        {
            path: '/three05',
            component:()=>import("../views/three05/index.vue"),
            title:"学习纹理贴图"
        },
        {
            path: '/three06',
            component:()=>import("../views/three06/index.vue"),
            title:"学习直线曲线样条曲线贝塞尔曲线"
        }
    ]
})



export default router