<template>
  <LoginSignUp />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginSignUp from "@/components/LoginSignUp.vue";

export default defineComponent({
  name: "App",
  components: {
    LoginSignUp,
  },
});
</script>
