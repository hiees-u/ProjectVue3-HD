<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

import BaseTooltip from "../components/BaseTooltip.vue";
import vTooltip from "../utils/vTooltip";

const currentTime = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));
</script>

<template>
  <BaseTooltip text="The Home Page" position="top">
    <h1>Home</h1>
  </BaseTooltip>
  <br />
  <p>Current Time: {{ currentTime }}</p>
  <p v-format-date="'MMMM D, YYYY'">2024-03-01</p>
  <br />
  <div>
    <p>
      Grade 1: 3. Add a new page (routing)
      <i class="fa-solid fa-check-double"></i>
    </p>
    <p>
      Grade 1: 4. Nested router/view <i class="fa-solid fa-check-double"></i>
    </p>
    <p v-tooltip="'Create a directive'">
      Grade 1: 5. Build a project with SASS
      <i class="fa-solid fa-check-double"></i>
    </p>
    <!-- <p>
    Grade 2: 1. Vue 3 filters are replaced by computed properties and methods:
    <i class="fa-solid fa-check-double"></i>
  </p> -->
    <p>
      Grade 2: 2. b. Use DateTime filter with dayjs
      <i class="fa-solid fa-check-double"></i>
    </p>
    <p>
      Grade 2: 6. Create a directive <i class="fa-solid fa-check-double"></i>
    </p>
    <p v-tooltip="'Create a directive'">
      Grade 4: Vue3 and TypeScript <i class="fa-solid fa-check-double"></i>
    </p>
    <p>
      Grade 5: Write test
      <i class="fa-solid fa-check-double"></i>
    </p>
    <p>
      Practice 1
      <i class="fa-solid fa-check-double"></i>
    </p>
  </div>
</template>

<style lang="sass" scoped>
i
    color: green

p
    width: fit-content
</style>
