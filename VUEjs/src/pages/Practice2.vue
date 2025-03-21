<script setup lang="ts">
import BaseTooltip from "../components/BaseTooltip.vue";
import Practice2List from "../components/Practice2-list.vue";
import DetailtItem from "../components/DetailtItem.vue";
import InsertItem from "../components/InsertItem.vue";
import { ref } from "vue";
import { Product } from "../utils/model";

const addItemModalRef = ref<InstanceType<typeof InsertItem> | null>(null);
const product = ref<Product | undefined>(undefined);

const insert = () => {
  addItemModalRef.value?.openModal();
};

const handleInsertProduct = (newProduct: Product) => {
  product.value = newProduct;
  console.log("Inserting product", product.value);
};
</script>

<template>
  <div>
    <BaseTooltip
      text="Practice 2: A complete CRUD with nested routing and custom validation"
      position="top"
    >
      <h1>Practice 2</h1>
    </BaseTooltip>

    <div class="content">
      <Practice2-list :newProduct = "product"  />
      <div>
        <button @click="insert()">Inssert</button>
        <DetailtItem />
      </div>
      <div>
        <InsertItem @insertProduct="handleInsertProduct" ref="addItemModalRef" />
      </div>
    </div>
    <div>
      <p>Create a complete CRUD feature with:</p>
      <p>List <i class="fa-solid fa-check-double"></i></p>
      <p>Filter <i class="fa-solid fa-check-double"></i></p>
      <p>
        Nested routing view (detail) - click a row on the list, and the detail
        will appear beside the table instead of a new page.
        <i class="fa-solid fa-check-double"></i>
      </p>
      <p>
        The form needs to use a custom input (a 2-way binding component)
        <i class="fa-solid fa-check-double"></i>
      </p>
      <p>
        Use the teleport concept for the add (form)
        <i class="fa-solid fa-check-double"></i>
      </p>
      <p>
        And using the validation framework with a custom validator
        <i class="fa-solid fa-check-double"></i>
      </p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.content
  display: flex
  justify-content: space-around

p
  text-align: left

i
  color: #90EE90
</style>
