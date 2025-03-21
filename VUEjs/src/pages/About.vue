<script setup lang="ts">
import { ref, computed } from "vue";

import { api } from "../utils/api";
import InputTextAndLabel from "../components/InputTextAndLabel.vue";
import BaseTooltip from "../components/BaseTooltip.vue";

const uName = ref("");
let uAge = ref(0);
const data = ref({});
const getAge = async () => {
  try {
    uAge.value = (await api.get(`?name=${uName.value}`)).data.age;
  } catch (error) {
    console.error(error);
  }
};

const Age = computed(() => {
  return `${uAge.value} Age`;
});
</script>

<template>
  <BaseTooltip text="Get Age By Name" position="top">
    <h1>Get Age By Name</h1>
  </BaseTooltip>
  <InputTextAndLabel
    v-model:Value="uName"
    Label="Name"
    Placeholder="Enter user name.."
  />
  <p>Input Value Text Box: {{ uName == "" ? "..." : uName }}</p>
  <button @click="getAge">Get Age</button>
  <p>Age: {{ Age }}</p>
  <br /><br />
  <p>
    Grade 2: 1. Custom filters.
    <i class="fa-solid fa-check-double"></i>
  </p>
  <p>
    Grade 2: 3. Use Axios to call API and configure Axios with config &
    interceptor.
    <i class="fa-solid fa-check-double"></i>
  </p>
  <p>
    Grade 2: 4. Create reusable custom components.
    <i class="fa-solid fa-check-double"></i>
  </p>
  <p>
    Grade 2: 5. Create a 2-way binding custom component.
    <i class="fa-solid fa-check-double"></i>
  </p>
  <p>
    Grade 3: 1. Create a global spinner. That will be shown for any awaiting API
    call. (see the Practice 1 section).
    <i class="fa-solid fa-check-double"></i>
  </p>
</template>

<style lang="sass" scoped>
i
    color: green
</style>
