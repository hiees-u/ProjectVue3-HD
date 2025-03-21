<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import InputTextAndLabel from "../components/InputTextAndLabel.vue";
import { createDefaultProduct } from "../utils/model";
// import { productApi } from "../utils/api";

const version = ref(true);
const store = useStore();
const product = ref(createDefaultProduct());

const sharedData = computed(() => {
  const result = store.getters.getSharedData;
  version.value = result.type;
  product.value = result.sharedData;
  return result.sharedData;
});

const log = () => console.log(product.value);
</script>

<template>
  <div>
    <h1>Product Details</h1>
    <div v-if="sharedData.id != 0">
      <InputTextAndLabel
        :Disabled="version"
        v-model:Value="product.id"
        Label="ID"
        Placeholder=""
      />
      <InputTextAndLabel
        :Disabled="version"
        v-model:Value="product.title"
        Label="Tilte"
        Placeholder=""
      />
      <InputTextAndLabel
        :Disabled="version"
        v-model:Value="product.price"
        Label="Price"
        Placeholder=""
      />
      <!-- <div>
        <RouterLink :to="`/practice2/edit/${product.id}`">Edit</RouterLink>
      </div> -->
    </div>
    <div v-else>
      <p>No product data available.</p>
    </div>
    <div v-if="!version"><Button @click.prevent="log">Update</Button></div>
  </div>
</template>

<style scoped></style>
