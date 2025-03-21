<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Spinner from "./components/Spinner.vue";
import { useSpinnerStore } from "./stores/spinner";
// import BaseTooltip from "./components/BaseTooltip.vue";

const router = useRouter();
const spinnerStore = useSpinnerStore();
const currentRoute = ref(router.currentRoute.value.path);

const goTo = (path: string) => {
  router.push({ path });
};

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    currentRoute.value = newPath;
  }
);
</script>

<template>
  <button
    @click="goTo('/')"
    :class="{
      'active-link':
        currentRoute !== '/practice2' &&
        currentRoute !== '/practice3' &&
        currentRoute !== '/practice4',
    }"
  >
    Practice 1
  </button>
  <button
    @click="goTo('/practice2')"
    :class="{ 'active-link': currentRoute === '/practice2' }"
  >
    Practice 2
  </button>
  <button
    @click="goTo('/practice3')"
    :class="{ 'active-link': currentRoute === '/practice3' }"
  >
    Practice 3
  </button>
  <button
    @click="goTo('/practice4')"
    :class="{ 'active-link': currentRoute === '/practice4' }"
  >
    Practice 4
  </button>
  <router-view />
  <Spinner v-if="spinnerStore.isVisible" />
</template>

<style scoped lang="sass">
button
  width: fit-content
</style>
