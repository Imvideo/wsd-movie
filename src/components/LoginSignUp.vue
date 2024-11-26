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
          'z-10 translate-y-minus-30 bg-white text-black h-96': !isSignUp,
          'z-0 translate-y-40 bg-blue-500 text-white h-[450px]': isSignUp,
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
              <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
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
              v-if="!isSignUp"
              class="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              @click.prevent="handleLogin"
          >
            LOGIN
          </button>
        </div>
        <!-- "Don't have an account?" 문구 -->
        <p
            v-if="!isSignUp"
            class="mt-4 text-center text-sm text-white bg-blue-500 py-2 rounded-b-lg"
        >
          Don't have an account?
          <a
              href="#"
              class="font-bold hover:underline"
              @click.prevent="toggleCard"
          >
            Sign up
          </a>
        </p>
      </div>

      <!-- 회원가입 카드 -->
      <div
          class="absolute w-full transition-transform duration-700 ease-in-out rounded-lg shadow-lg"
          :class="{
          'z-10 translate-y-minus-30 bg-white text-black h-96': isSignUp,
          'z-0 translate-y-40 bg-blue-500 text-white h-[450px]': !isSignUp,
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
              v-if="isSignUp"
              class="mt-6 w-full py-2 px-4 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              @click.prevent="handleSignUp"
          >
            SIGN UP
          </button>
        </div>
        <!-- "Already have an account?" 문구 -->
        <p
            v-if="isSignUp"
            class="mt-4 text-center text-sm text-white bg-blue-500 py-2 rounded-b-lg"
        >
          Already have an account?
          <a
              href="#"
              class="font-bold hover:underline"
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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginSignUp",
  setup() {
    const router = useRouter(); // Vue Router 객체
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");

    const handleLogin = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === username.value && user.password === password.value) {
          errorMessage.value = ""; // 에러 메시지 초기화
          router.push("/"); // 로그인 성공 후 홈 페이지로 이동
        } else {
          errorMessage.value = "Incorrect username or password.";
        }
      } else {
        errorMessage.value = "No user found. Please sign up first.";
      }
    };

    return {
      username,
      password,
      email,
      confirmPassword,
      errorMessage,
      handleLogin,
    };
  },
});
</script>




<style scoped>
/* 카드 높이 및 위치 조정 */
.translate-y-minus-30 {
  transform: translateY(-30px);
}

.translate-y-40 {
  transform: translateY(40px);
}
</style>
