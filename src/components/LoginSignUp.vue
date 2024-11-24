<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 relative overflow-hidden">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 카드 컨테이너 -->
    <div class="relative w-full max-w-md h-[400px] perspective">
      <!-- 로그인 카드 -->
      <div
          class="absolute w-full h-full transition-transform duration-700 ease-in-out transform-style-3d"
          :class="{
          'translate-x-0 z-10 scale-100': !isSignUp,
          '-translate-x-[120%] -rotate-y-15 z-0 scale-90 bg-blue-500 text-white': isSignUp,
        }"
      >
        <div class="p-6 h-full flex flex-col justify-center items-center">
          <h2 class="text-xl font-bold mb-4">Sign in</h2>
          <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-3">
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
          <p class="mt-4 text-sm">
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
      </div>

      <!-- 회원가입 카드 -->
      <div
          class="absolute w-full h-full transition-transform duration-700 ease-in-out transform-style-3d"
          :class="{
          'translate-x-0 z-10 scale-100': isSignUp,
          'translate-x-[120%] rotate-y-15 z-0 scale-90 bg-blue-500 text-white': !isSignUp,
        }"
      >
        <div class="p-6 h-full flex flex-col justify-center items-center">
          <h2 class="text-xl font-bold mb-4">Sign up</h2>
          <form @submit.prevent="handleSignUp" class="w-full flex flex-col gap-3">
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
          <p class="mt-4 text-sm">
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
/* 3D 스타일 */
.perspective {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.bg-blue-500.text-white .focus:ring-white {
  focus-ring-color: white;
}

.rotate-y-15 {
  transform: rotateY(15deg);
}

.translate-x-[120%] {
  transform: translateX(translate(1) rotate);
}
</style>
