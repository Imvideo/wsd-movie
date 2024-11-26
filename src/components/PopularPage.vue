<template>
  <div class="min-h-screen bg-gray-900 text-white">

    <!-- Main Content -->
    <div class="p-4">
      <div class="flex justify-end mb-4 space-x-4">
        <!-- Table View 버튼 (아이콘) -->
        <button
            @click="viewMode = 'table'"
            :class="viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-700'"
            class="px-4 py-2 rounded-md flex items-center"
        >
          <font-awesome-icon icon="th-large" class="text-xl" />
        </button>
        <!-- Infinite Scroll 버튼 (아이콘) -->
        <button
            @click="viewMode = 'infinite'"
            :class="viewMode === 'infinite' ? 'bg-blue-500 text-white' : 'bg-gray-700'"
            class="px-4 py-2 rounded-md flex items-center"
        >
          <font-awesome-icon icon="arrows-alt-v" class="text-xl" />
        </button>
      </div>

      <div v-if="viewMode === 'table'">
        <!-- Table View -->
        <div class="grid grid-cols-4 gap-4">
          <div
              v-for="movie in currentMovies"
              :key="movie.id"
              class="bg-gray-800 p-2 rounded-md flex flex-col items-center"
          >
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-48 object-cover rounded-md"
            />
            <p class="mt-2 text-center text-sm">{{ movie.title }}</p>
          </div>
        </div>
        <!-- Pagination -->
        <div class="flex justify-center items-center mt-4">
          <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-700 rounded-md mr-2 disabled:opacity-50"
          >
            <font-awesome-icon icon="arrow-left" class="mr-1" />
            이전
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-gray-700 rounded-md ml-2 disabled:opacity-50"
          >
            다음
            <font-awesome-icon icon="arrow-right" class="ml-1" />
          </button>
        </div>
      </div>

      <div v-else>
        <!-- Infinite Scroll -->
        <div class="grid grid-cols-4 gap-4">
          <div
              v-for="movie in movies"
              :key="movie.id"
              class="bg-gray-800 p-2 rounded-md flex flex-col items-center"
          >
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-48 object-cover rounded-md"
            />
            <p class="mt-2 text-center text-sm">{{ movie.title }}</p>
          </div>
        </div>
        <div v-if="loading" class="text-center mt-4">
          <p>Loading...</p>
        </div>
      </div>
    </div>

    <!-- Top Button -->
    <button
        @click="scrollToTop"
        class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
    >
      <font-awesome-icon icon="arrow-up" class="mr-2" />
      Top
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import { fetchPopularMovies } from "@/services/tmdbService";

export default defineComponent({
  name: "PopularPage",
  components: {
  },
  setup() {
    const viewMode = ref("table"); // "table" or "infinite"
    const movies = ref<any[]>([]);
    const currentMovies = ref<any[]>([]);
    const currentPage = ref(1);
    const totalPages = ref(10); // Example total pages
    const loading = ref(false);

    const apiKey = localStorage.getItem("apiKey");

    const getImageUrl = (path: string) =>
        `https://image.tmdb.org/t/p/w500${path}`;

    const loadMovies = async (page: number) => {
      if (!apiKey) {
        console.error("API Key is missing!");
        return;
      }
      loading.value = true;
      try {
        const response = await fetchPopularMovies(apiKey, page);
        if (viewMode.value === "infinite") {
          movies.value = [...movies.value, ...response];
        } else {
          currentMovies.value = response;
        }
        totalPages.value = 10; // Example total pages, set this based on actual API response
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        loadMovies(page);
      }
    };

    const handleScroll = () => {
      if (viewMode.value !== "infinite") return;

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value) {
        changePage(currentPage.value + 1);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      loadMovies(currentPage.value);
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      viewMode,
      movies,
      currentMovies,
      currentPage,
      totalPages,
      loading,
      getImageUrl,
      changePage,
      scrollToTop,
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
