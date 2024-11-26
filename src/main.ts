import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css"; // Tailwind CSS 연결

// FontAwesome 관련 임포트
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilm, faUserCircle, faThLarge, faArrowsAltV, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// FontAwesome 라이브러리에 아이콘 추가
library.add(faFilm, faUserCircle, faThLarge, faArrowsAltV, faArrowUp);

const app = createApp(App);

// FontAwesome 아이콘을 글로벌 컴포넌트로 등록
app.component("font-awesome-icon", FontAwesomeIcon);

// 라우터 연결
app.use(router);

// 앱 마운트
app.mount("#app");
