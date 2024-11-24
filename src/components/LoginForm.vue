<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">로그인</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">아이디</label>
          <input
              v-model="username"
              type="text"
              id="username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleSubmit = () => {
  // 로그인 처리 로직을 여기에 추가하세요
  console.log('아이디:', username.value)
  console.log('비밀번호:', password.value)
}
</script>
