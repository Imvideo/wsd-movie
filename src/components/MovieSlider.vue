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
            class="relative w-40 flex-shrink-0 mx-2 cursor-pointer"
            @click="toggleWishlist(movie)"
        >
          <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="rounded shadow"
          />
          <p class="mt-2 text-sm text-center">{{ movie.title }}</p>
          <!-- 찜 상태 표시 -->
          <span
              v-if="movie.isWishlist"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ❤️
          </span>
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
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
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

    const loadWishlistStatus = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      movies.value = movies.value.map((movie) => ({
        ...movie,
        isWishlist: wishlist.some((item: any) => item.id === movie.id),
      }));
    };

    const toggleWishlist = (movie: any) => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (movie.isWishlist) {
        const updatedWishlist = wishlist.filter((item: any) => item.id !== movie.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        wishlist.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      // 상태 반영 및 이벤트 발생
      loadWishlistStatus();
      window.dispatchEvent(new Event("wishlistUpdated"));
    };

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

    const syncWishlist = () => {
      loadWishlistStatus();
    };

    onMounted(async () => {
      let fetchedMovies: any[] = [];
      if (props.fetchType === "discover" && props.genreId) {
        fetchedMovies = await fetchMoviesByGenre(props.genreId, props.apiKey);
      } else {
        fetchedMovies = await fetchMoviesByType(props.fetchType, props.apiKey);
      }

      movies.value = fetchedMovies.map((movie: any) => ({
        ...movie,
        isWishlist: false,
      }));

      loadWishlistStatus();

      // 이벤트 리스너 등록
      window.addEventListener("wishlistUpdated", syncWishlist);
    });

    onUnmounted(() => {
      // 이벤트 리스너 제거
      window.removeEventListener("wishlistUpdated", syncWishlist);
    });

    return {
      movies,
      currentOffset,
      slideLeft,
      slideRight,
      toggleWishlist,
    };
  },
});
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
button:hover {
  background-color: #444;
}
</style>
