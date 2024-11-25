import { createRouter, createWebHistory } from "vue-router";
import LoginSignUp from "@/components/LoginSignUp.vue";
import HomePage from "@/components/Home.vue"; // 변경된 컴포넌트 이름

const routes = [
    {
        path: "/signin",
        name: "SignIn",
        component: LoginSignUp,
    },
    {
        path: "/",
        name: "Home",
        component: HomePage, // 변경된 컴포넌트 이름
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/signin",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
