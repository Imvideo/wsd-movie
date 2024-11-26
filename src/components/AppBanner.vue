<template>
  <section
      class="relative h-96 bg-cover bg-center text-white flex items-end"
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }"
      v-if="movie"
  >
    <div class="p-6 bg-gradient-to-t from-black to-transparent w-full">
      <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
      <p class="mb-4">{{ movie.overview }}</p>
      <div class="flex space-x-4">
        <button class="bg-white text-black px-6 py-2 rounded">재생</button>
        <button class="bg-gray-700 px-6 py-2 rounded">상세 정보</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchMovieDetails } from "@/services/tmdbService";

export default defineComponent({
  name: "AppBanner",
  setup() {
    const movie = ref<any>(null);

    onMounted(async () => {
      const movieId = 580489; // 예시로 '베놈' 영화 ID 사용
      movie.value = await fetchMovieDetails(movieId);
    });

    return {
      movie,
    };
  },
});
</script>
