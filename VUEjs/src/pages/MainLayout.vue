<script setup>
import { useRouter } from "vue-router";

import { ref, watch } from "vue";

const router = useRouter();
const currentRoute = ref(router.currentRoute.value.path);

const goTo = (path) => {
  console.log(path);
  router.push(path);
};

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    currentRoute.value = newPath;
  }
);
</script>

<template>
  <br />
  <button @click="goTo('/')" :class="{ 'active-link': currentRoute === '/' }">
    Go to Home
  </button>
  <button
    @click="goTo('/about')"
    :class="{ 'active-link': currentRoute === '/about' }"
  >
    Get Age By Name
  </button>
  <button
    @click="goTo('/contacts')"
    :class="{ 'active-link': currentRoute === '/contacts' }"
  >
    Go to Contacts
  </button>
  <router-view />
</template>

<style scoped lang="sass">
button
  margin: 10px
  padding: 10px
  border: 1px solid #000
  border-radius: 5px
  cursor: pointer
</style>
