<template>
  <div>
    <!-- 로딩 상태가 true일 때 Loading... 표시 -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <p class="text-white text-xl font-bold">Loading...</p>
    </div>

    <!-- 헤더는 로그인 화면(/signin)이 아닌 상태에서만 표시 -->
    <AppHeader v-if="showHeader" />

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, provide } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useRoute } from "vue-router";

// 로딩 상태를 전역적으로 제공하기 위한 심볼
export const loadingSymbol = Symbol("loading");

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();

    // 로그인 화면(/signin)인지 여부를 확인
    const showHeader = computed(() => route.path !== "/signin");

    // 로딩 상태 관리
    const isLoading = ref(false);

    // 로딩 상태를 전역적으로 제공
    provide(loadingSymbol, isLoading);

    return {
      showHeader,
      isLoading,
    };
  },
});
</script>

<style scoped>
/* 로딩 스타일 */
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-black {
  background-color: black;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.z-50 {
  z-index: 50;
}
.text-white {
  color: white;
}
.text-xl {
  font-size: 1.25rem;
}
.font-bold {
  font-weight: bold;
}
</style>
