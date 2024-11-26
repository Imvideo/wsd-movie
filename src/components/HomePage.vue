<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <AppHeader />
    <AppBanner :apiKey="apiKey" />
    <MovieList :apiKey="apiKey" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue"; // 헤더 컴포넌트
import AppBanner from "@/components/AppBanner.vue"; // 배너 컴포넌트
import MovieList from "@/components/MovieList.vue"; // 영화 리스트 컴포넌트

export default defineComponent({
  name: "HomePage",
  components: {
    AppHeader,
    AppBanner,
    MovieList,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey"));

    onMounted(() => {
      if (!apiKey.value) {
        alert("API key is missing. Please log in again.");
        window.location.href = "/signin";
      }
    });

    return {
      apiKey,
    };
  },
});
</script>
