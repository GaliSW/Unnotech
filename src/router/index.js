import {
    createWebHistory,
    createWebHashHistory,
    createRouter,
} from "vue-router";

import BookList from "@/pages/BookList.vue";
import BookDetail from "@/pages/BookDetail.vue";

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition && to.meta.keepAlive) {
        return savedPosition;
    }
    return { left: 0, top: 0 };
};

export const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    scrollBehavior,
    routes: [
        {
            path: "/",
            redirect: "/books",
        },
        {
            path: "/books",
            component: BookList,
        },
        {
            path: "/books/:id",
            component: BookDetail,
        },
    ],
});
