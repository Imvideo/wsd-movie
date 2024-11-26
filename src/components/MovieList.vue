<template>
  <section class="p-6">
    <h2 class="text-2xl font-bold mb-4">인기 영화</h2>
    <div class="grid grid-cols-5 gap-4">
      <div
          v-for="movie in movies"
          :key="movie.id"
          class="group relative"
      >
        <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="w-full h-auto rounded"
        />
        <h3
            class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2 opacity-0 group-hover:opacity-100"
        >
          {{ movie.title }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchPopularMovies } from "@/services/tmdbService";

export default defineComponent({
  name: "MovieList",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<any[]>([]);

    onMounted(async () => {
      movies.value = await fetchPopularMovies(props.apiKey);
    });

    return {
      movies,
    };
  },
});
</script>
