<template>
  <header class="flex items-center justify-between p-4 bg-black text-white fixed top-0 left-0 w-full z-10">
    <!-- 로고 -->
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="w-8 h-8 mr-4" />
      <nav class="flex space-x-6">
        <router-link
            to="/"
            class="text-gray-300 hover:text-white"
            active-class="text-white font-bold"
        >
          홈
        </router-link>
        <router-link
            to="/browse"
            class="text-gray-300 hover:text-white"
            active-class="text-white font-bold"
        >
          대세 콘텐츠
        </router-link>
        <router-link
            to="/explore"
            class="text-gray-300 hover:text-white"
            active-class="text-white font-bold"
        >
          찾아보기
        </router-link>
        <router-link
            to="/mylist"
            class="text-gray-300 hover:text-white"
            active-class="text-white font-bold"
        >
          내가 찜한 리스트
        </router-link>
      </nav>
    </div>

    <!-- 프로필 아이콘 -->
    <div>
      <button class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
        <img src="/user-icon.png" alt="Profile" class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>
