<template>
  <div>
    <!-- 헤더는 로그인 화면(/signin)이 아닌 상태에서만 표시 -->
    <AppHeader v-if="showHeader" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();

    // 로그인 화면(/signin)인지 여부를 확인
    const showHeader = computed(() => route.path !== "/signin");

    return {
      showHeader,
    };
  },
});
</script>
