<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">내가 찜한 리스트</h1>
      <div v-if="wishlist.length === 0" class="text-center">
        <p>찜한 영화가 없습니다.</p>
      </div>
      <div v-else class="grid grid-cols-4 gap-4">
        <div
            v-for="movie in wishlist"
            :key="movie.id"
            class="relative bg-gray-800 p-2 rounded-md flex flex-col items-center"
        >
          <img
              :src="getImageUrl(movie.poster_path)"
              :alt="movie.title"
              class="w-full h-48 object-cover rounded-md"
              @error="handleImageError"
          />
          <p class="mt-2 text-center text-sm">{{ movie.title }}</p>
          <!-- 찜 표시 아이콘 -->
          <span
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ❤️
          </span>
          <button
              @click="removeFromWishlist(movie.id)"
              class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            찜 해제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "WishlistPage",
  setup() {
    const wishlist = ref<any[]>([]);

    // 로컬 스토리지에서 위시리스트 로드
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem("wishlist");
      wishlist.value = storedWishlist ? JSON.parse(storedWishlist) : [];
    };

    // 위시리스트에서 영화 제거
    const removeFromWishlist = (movieId: number) => {
      wishlist.value = wishlist.value.filter((movie) => movie.id !== movieId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist.value));
    };

    // 포스터 URL 반환
    const getImageUrl = (path: string) =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.jpg";

    // 이미지 로드 실패 시 처리
    const handleImageError = (event: Event) => {
      (event.target as HTMLImageElement).src = "/placeholder.jpg";
    };

    // 컴포넌트 마운트 시 위시리스트 로드
    loadWishlist();

    return {
      wishlist,
      removeFromWishlist,
      getImageUrl,
      handleImageError,
    };
  },
});
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
button:hover {
  background-color: #ff7b7b;
}
</style>
