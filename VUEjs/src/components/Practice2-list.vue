<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { productApi } from "../utils/api";
import { Product } from "../utils/model";

const products = ref<Product[]>([]);
const sort = ref(0);
const store = useStore();
// const product = ref<Product | undefined>(undefined);

onMounted(async () => {
  try {
    const res = await productApi.get(`products?limit=10`);
    products.value = res.data.products.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price,
    }));
  } catch (error) {
    console.error(error);
  }
});

const handleFilter = computed(() => {
  const sortedProducts = [...products.value];

  if (sort.value == 0) {
    return products.value;
  }

  return sort.value > 0
    ? sortedProducts.sort((a, b) => a.price - b.price)
    : sortedProducts.sort((a, b) => b.price - a.price);
});

const detailOrEditProduct = (product: Product, detail: boolean = true) => {
  store.dispatch("updateSharedData", { product: product, type: detail });
};

const props = defineProps<{
  newProduct: Product | undefined;
}>();

watch(() => props.newProduct, (newVal) => {
  if (newVal) {
    products.value.push(newVal);
  }
  console.log("Product changed", newVal);
});
</script>

<template>
  <div class="container">
    <div class="content">
      <select v-model="sort">
        <option value="1">Ascending sort</option>
        <option value="0" selected>Default</option>
        <option value="-1">Descending sort</option>
      </select>
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>Price</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            @click="detailOrEditProduct(product, true)"
            v-for="product in handleFilter"
            :key="product.id"
          >
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click.stop="detailOrEditProduct(product, false)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="sass">
.table
  > tbody
    > tr
      &:hover
        background-color: #ddd

.table
  > tbody
    > tr
        cursor: pointer
.container
  min-height: 500px
</style>
