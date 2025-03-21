<script setup lang="ts">
import { ref } from "vue";
import BaseTooltip from "../components/BaseTooltip.vue";
import { apiMain } from "../utils/api";

const res = ref<string>();

const onCallAPI = () => {
  apiMain
    .get("Auth")
    .then((response) => (res.value = response.data.message))
    .catch((error) => console.error(error));
};
</script>

<template>
  <BaseTooltip text="This is a contacts page" position="bottom">
    <h1>Contacts</h1>
  </BaseTooltip>
  <p>You are logged in as User</p>
  <p>Click the Button to test API</p>

  <button @click.prevent="onCallAPI">CLICK TEST PRACTIVE 2</button>
  <p>{{ res }}</p>
</template>

<style lang="sass" scoped>
p
  color: blue
</style>
