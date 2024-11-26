<template>
  <div class="mb-6 relative group">
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <div class="overflow-hidden relative">
      <div
          ref="slider"
          class="flex transition-transform duration-300"
          :style="{ transform: `translateX(-${currentOffset}px)` }"
      >
        <div
            v-for="movie in movies"
            :key="movie.id"
            class="w-40 flex-shrink-0 mx-2"
        >
          <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="rounded shadow"
          />
          <p class="mt-2 text-sm text-center">{{ movie.title }}</p>
        </div>
      </div>
    </div>
    <!-- 왼쪽 화살표 -->
    <button
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-hover:block"
        @click="slideLeft"
    >
      <span>&lt;</span>
    </button>
    <!-- 오른쪽 화살표 -->
    <button
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-hover:block"
        @click="slideRight"
    >
      <span>&gt;</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchMoviesByType, fetchMoviesByGenre } from "@/services/tmdbService";

export default defineComponent({
  name: "MovieSlider",
  props: {
    title: {
      type: String,
      required: true,
    },
    fetchType: {
      type: String,
      required: true,
    },
    genreId: {
      type: Number,
      required: false,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<any[]>([]);
    const currentOffset = ref(0);
    const sliderWidth = 640; // 슬라이더 한 화면의 너비
    const itemWidth = 160; // 아이템 한 개의 너비 (마진 포함)

    const slideLeft = () => {
      currentOffset.value = Math.max(0, currentOffset.value - itemWidth);
    };

    const slideRight = () => {
      const maxOffset = Math.max(
          0,
          movies.value.length * itemWidth - sliderWidth
      );
      currentOffset.value = Math.min(maxOffset, currentOffset.value + itemWidth);
    };

    onMounted(async () => {
      if (props.fetchType === "discover" && props.genreId) {
        movies.value = await fetchMoviesByGenre(props.genreId, props.apiKey);
      } else {
        movies.value = await fetchMoviesByType(props.fetchType, props.apiKey);
      }
    });

    return {
      movies,
      currentOffset,
      slideLeft,
      slideRight,
    };
  },
});
</script>


<style scoped>
.overflow-x-auto {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none; /* 스크롤바 숨기기 */
}

.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>
