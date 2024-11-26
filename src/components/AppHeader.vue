<template>
  <header class="bg-black text-white flex items-center justify-between px-4 py-2">
    <!-- 로고 -->
    <div class="flex items-center">
      <font-awesome-icon icon="film" class="text-red-500 h-6 w-6 mr-2" />
      <span class="text-lg font-bold">MovieApp</span>
    </div>

    <!-- 네비게이션 -->
    <nav class="flex space-x-4">
      <router-link to="/" class="hover:underline">홈</router-link>
      <router-link to="/popular" class="hover:underline">대세 콘텐츠</router-link>
      <router-link to="/search" class="hover:underline">찾아보기</router-link>
      <router-link to="/wishlist" class="hover:underline">내가 찜한 리스트</router-link>
    </nav>

    <!-- 유저 아이콘 -->
    <font-awesome-icon
        icon="user-circle"
        class="h-8 w-8 cursor-pointer"
        @click="handleLogout"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const router = useRouter();

    const handleLogout = () => {
      localStorage.removeItem("apiKey");
      router.push("/signin");
    };

    return { handleLogout };
  },
});
</script>

<style scoped>
/* 헤더 스타일 */
header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
