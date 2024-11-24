<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 bg-opacity-90 relative">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 로그인 카드 -->
    <div class="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-sm z-10">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
      <form @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="mb-4">
          <input
              v-model="username"
              type="text"
              placeholder="Username or Email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Password -->
        <div class="mb-6">
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Remember me & Forgot Password -->
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center text-sm">
            <input type="checkbox" class="form-checkbox text-blue-500" />
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-500 hover:underline">Forgot Password?</a>
        </div>
        <!-- Login Button -->
        <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          LOGIN
        </button>
      </form>
      <!-- Footer -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="#" class="text-blue-500 hover:underline font-medium">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");

    const handleLogin = () => {
      console.log("Username:", username.value);
      console.log("Password:", password.value);
      alert("Login clicked!");
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
/* 배경과 카드 스타일 */
.bg-gray-800 {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
}
</style>
