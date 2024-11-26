// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css"; // Tailwind CSS 연결
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilm, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// Font Awesome 라이브러리에 아이콘 추가
library.add(faFilm, faUserCircle);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");