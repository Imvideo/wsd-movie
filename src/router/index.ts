import { createRouter, createWebHistory } from "vue-router";
import LoginSignUp from "@/components/LoginSignUp.vue";
import HomePage from "@/views/HomePage.vue"; // HomePage 컴포넌트 추가

const routes = [
    {
        path: "/signin", // 로그인 페이지
        name: "SignIn",
        component: LoginSignUp,
    },
    {
        path: "/", // 홈 페이지
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/", // 기본 경로를 로그인 페이지로 리디렉션
        redirect: "/signin",
    },
    {
        path: "/:pathMatch(.*)*", // 잘못된 경로 처리
        redirect: "/signin",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
