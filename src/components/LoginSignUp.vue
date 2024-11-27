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
          'z-0 translate-y-40 bg-blue-500 text-white h-96': isSignUp,
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
                  placeholder="API Key (as password)"
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
        <!-- Sign up 문구 -->
        <p
            v-if="!isSignUp"
            class="text-center text-sm text-white bg-blue-500 py-2 rounded-b-lg"
        >
          Don't have an account?
          <a
              href="#"
              class="font-bold text-white hover:underline"
              @click.prevent="toggleCard('signup')"
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
          'z-0 translate-y-40 bg-blue-500 text-white h-96': !isSignUp,
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
                  placeholder="API Key (as password)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
              />
              <input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm API Key"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
              />
              <!-- Terms & Conditions 체크박스 -->
              <label class="flex items-center gap-2">
                <input
                    type="checkbox"
                    v-model="termsAccepted"
                    class="form-checkbox text-blue-500"
                />
                <span>I have read Terms and Conditions</span>
              </label>
            </form>
          </div>
          <button
              v-if="isSignUp"
              :disabled="!termsAccepted"
              class="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              @click.prevent="handleSignUp"
          >
            SIGN UP
          </button>
        </div>
        <!-- Sign in 문구 -->
        <p
            v-if="isSignUp"
            class="text-center text-sm text-white bg-blue-500 py-2 rounded-b-lg"
        >
          Already have an account?
          <a
              href="#"
              class="font-bold text-white hover:underline"
              @click.prevent="toggleCard('signin')"
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
    const router = useRouter();
    const isSignUp = ref(false);
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const confirmPassword = ref("");
    const termsAccepted = ref(false);
    const errorMessage = ref("");

    const resetFields = () => {
      username.value = "";
      password.value = "";
      email.value = "";
      confirmPassword.value = "";
      termsAccepted.value = false;
      errorMessage.value = "";
    };

    const toggleCard = (type: string) => {
      resetFields();
      isSignUp.value = type === "signup";
    };

    const handleLogin = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        errorMessage.value = "Account does not exist. Please sign up first!";
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (
          username.value !== parsedUser.email ||
          password.value !== parsedUser.password
      ) {
        errorMessage.value = "Invalid email or password!";
        return;
      }

      // 로그인 성공
      localStorage.setItem("apiKey", password.value);
      router.push("/"); // 로그인 성공 후 홈페이지로 이동
    };

    const handleSignUp = () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match!";
        return;
      }

      // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem(
          "user",
          JSON.stringify({ email: email.value, password: password.value })
      );

      // 회원가입 성공 후 로그인 화면으로 이동
      toggleCard("signin");
    };

    return {
      isSignUp,
      username,
      password,
      email,
      confirmPassword,
      termsAccepted,
      errorMessage,
      toggleCard,
      handleLogin,
      handleSignUp,
    };
  },
});
</script>


<style scoped>
.translate-y-minus-30 {
  transform: translateY(-30px);
}

.translate-y-40 {
  transform: translateY(40px);
}
</style>
