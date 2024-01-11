import { createApp } from 'vue'
import Index from './Index.vue'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createRouter, createWebHashHistory } from "vue-router"

/* 设置路由跳转 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: () => import("./Temp.vue") },
        { path: "/flat", component: () => import("./Flat.vue") }, // 剖切
        { path: "/cut", component: () => import("./Cut.vue") }, // 裁剪
        { path: "/edit", component: () => import("./Edit.vue") }, //模型编辑
    ]
});
const app = createApp(Index)
app.use(Antd);
app.use(router)
app.mount('#app')
