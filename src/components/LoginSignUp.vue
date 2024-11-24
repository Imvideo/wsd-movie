<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 relative">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 카드 컨테이너 -->
    <div class="relative w-full max-w-md flex flex-col justify-center">
      <!-- 로그인 카드 -->
      <div
          class="absolute w-full transition-transform duration-700 ease-in-out rounded-lg shadow-lg"
          :class="{
          'z-10 translate-y-[-30px] bg-white text-black h-[350px]': !isSignUp,
          'z-0 translate-y-[40px] bg-blue-500 text-white h-[400px]': isSignUp,
        }"
      >
        <div class="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 class="text-xl font-bold mb-4 text-center">Sign in</h2>
            <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4">
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
              <div class="flex items-center justify-between text-sm text-gray-600">
                <label class="flex items-center gap-1">
                  <input type="checkbox" class="form-checkbox text-blue-500" />
                  Remember me
                </label>
                <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
              </div>
            </form>
          </div>
          <button
              class="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              @click.prevent="toggleCard"
          >
            LOGIN
          </button>
        </div>
      </div>

      <!-- 회원가입 카드 -->
      <div
          class="absolute w-full transition-transform duration-700 ease-in-out rounded-lg shadow-lg"
          :class="{
          'z-10 translate-y-[-30px] bg-white text-black h-[350px]': isSignUp,
          'z-0 translate-y-[40px] bg-blue-500 text-white h-[400px]': !isSignUp,
        }"
      >
        <div class="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 class="text-xl font-bold mb-4 text-center">Sign up</h2>
            <form @submit.prevent="handleSignUp" class="w-full flex flex-col gap-4">
              <input
                  v-model="email"
                  type="email"
                  placeholder="Email"
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
              <input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
              />
            </form>
          </div>
          <button
              class="mt-6 w-full py-2 px-4 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              @click.prevent="toggleCard"
          >
            Sign in
          </button>
        </div>
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
/* 카드 높이 및 위치 조정 */
.translate-y-[-30px] {
  transform: translateY(-30px);
}

.translate-y-[40px] {
  transform: translateY(40px);
}
</style>
