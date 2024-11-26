<template>
  <header class="flex items-center justify-between p-4 bg-gray-900 text-white">
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="w-10 h-10 mr-4" />
      <nav class="flex space-x-4">
        <router-link to="/" class="hover:underline">홈</router-link>
        <router-link to="/browse" class="hover:underline">찾아보기</router-link>
        <router-link to="/mylist" class="hover:underline">내가 찜한 콘텐츠</router-link>
      </nav>
    </div>
    <div>
      <button>
        <img src="/user-icon.png" alt="User" class="w-8 h-8" />
      </button>
    </div>
  </header>
</template>
