<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 relative">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 카드 컨테이너 -->
    <div class="relative w-full max-w-md">
      <div
          class="perspective"
      >
        <!-- 회전 카드 -->
        <div
            class="transform-style-3d transition-transform duration-700"
            :class="{ 'rotate-y-180': isSignUp }"
        >
          <!-- 로그인 카드 -->
          <div class="absolute backface-hidden w-full">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
              <form @submit.prevent="handleLogin">
                <div class="mb-4">
                  <input
                      v-model="username"
                      type="text"
                      placeholder="Username or Email"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                  />
                </div>
                <div class="mb-6">
                  <input
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                  />
                </div>
                <button
                    type="submit"
                    class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  LOGIN
                </button>
              </form>
              <p class="mt-6 text-center text-sm text-gray-600">
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
          <div class="absolute backface-hidden w-full rotate-y-180">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign up</h2>
              <form @submit.prevent="handleSignUp">
                <div class="mb-4">
                  <input
                      v-model="email"
                      type="email"
                      placeholder="Email"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                  />
                </div>
                <div class="mb-4">
                  <input
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                  />
                </div>
                <div class="mb-6">
                  <input
                      v-model="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                  />
                </div>
                <div class="flex items-center mb-6">
                  <input
                      type="checkbox"
                      id="terms"
                      class="form-checkbox text-blue-500"
                      required
                  />
                  <label for="terms" class="ml-2 text-sm text-gray-600">
                    I have read Terms and Conditions
                  </label>
                </div>
                <button
                    type="submit"
                    class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  REGISTER
                </button>
              </form>
              <p class="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <a
                    href="#"
                    class="text-blue-500 hover:underline font-medium"
                    @click.prevent="toggleCard"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
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
.perspective {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
