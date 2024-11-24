<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 relative">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 카드 컨테이너 -->
    <div class="relative w-full max-w-md h-[400px] overflow-hidden">
      <!-- 로그인 카드 -->
      <div
          class="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 transition-transform duration-700 ease-in-out"
          :class="{
          'translate-x-0 z-10 scale-100': !isSignUp,
          '-translate-x-[120%] z-0 scale-90': isSignUp,
        }"
      >
        <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Sign in</h2>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-3">
          <input
              v-model="username"
              type="text"
              placeholder="Username or Email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
          />
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
          />
          <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            LOGIN
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a
              href="#"
              class="text-blue-500 hover:underline font-medium"
              @click.prevent="toggleCard"
          >
            Sign up
          </a>
        </p>
      </div>

      <!-- 회원가입 카드 -->
      <div
          class="absolute w-full h-full bg-blue-500 rounded-lg shadow-lg p-6 transition-transform duration-700 ease-in-out text-white"
          :class="{
          'translate-x-0 z-10 scale-100': isSignUp,
          'translate-x-[120%] z-0 scale-90': !isSignUp,
        }"
      >
        <h2 class="text-center text-xl font-bold mb-4">Sign up</h2>
        <form @submit.prevent="handleSignUp" class="flex flex-col gap-3">
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              required
          />
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              required
          />
          <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              required
          />
          <button
              type="submit"
              class="w-full py-2 px-4 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            REGISTER
          </button>
        </form>
        <p class="mt-4 text-center text-sm">
          Already have an account?
          <a
              href="#"
              class="text-white hover:underline font-medium"
              @click.prevent="toggleCard"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginSignUp",
  setup() {
    const isSignUp = ref(false);
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const confirmPassword = ref("");

    const toggleCard = () => {
      isSignUp.value = !isSignUp.value;
    };

    const handleLogin = () => {
      alert(`Logging in with username: ${username.value}`);
    };

    const handleSignUp = () => {
      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Registered with email: ${email.value}`);
    };

    return {
      isSignUp,
      username,
      password,
      email,
      confirmPassword,
      toggleCard,
      handleLogin,
      handleSignUp,
    };
  },
});
</script>

<style scoped>
/* 카드 전환 및 레이아웃 스타일 */
</style>
