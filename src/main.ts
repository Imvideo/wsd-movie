import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 라우터 임포트

import "./assets/tailwind.css"; // Tailwind CSS 연결

createApp(App).use(router).mount("#app");
