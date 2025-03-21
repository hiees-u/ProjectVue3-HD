<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay">
      <div class="modal-content" :class="{ show: show }">
        <h2>Add New Product</h2>
        <form @submit.prevent="submitForm">
          <InputTextAndLabel
            :Disabled="false"
            v-model:Value="product.id"
            Label="ID"
            Placeholder=""
          />
          <InputTextAndLabel
            :Disabled="false"
            v-model:Value="product.title"
            Label="Tilte"
            Placeholder=""
          />
          <InputTextAndLabel
            :Disabled="false"
            v-model:Value="product.price"
            Label="Price"
            Placeholder=""
          />

          <ul v-if="errors.length > 0" class="error-list">
            <li v-for="(error, index) in errors" :key="index" class="error">
              {{ error }}
            </li>
          </ul>

          <div class="modal-actions">
            <button type="submit">Save</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import InputTextAndLabel from "./InputTextAndLabel.vue";
import { Product } from "../utils/model";
import { minTitleLength, positivePrice } from "../utils/model";

const show = ref<boolean>(false);
const product = ref<Product>({
  id: 0,
  title: "",
  price: 0,
});
const errors = ref<string[]>([]);
const openModal = (): void => {
  show.value = true;
};
const closeModal = (): void => {
  show.value = false;
};

const rules = computed(() => ({
  title: { required, minTitleLength },
  price: { required, positivePrice },
}));

const v$ = useVuelidate(rules, product);

const emit = defineEmits<{ (event: "insertProduct", product: Product): void }>();

const submitForm = async (): Promise<void> => {
  console.log("Saving:", product);
  product.value.price = parseFloat(product.value.price as unknown as string);
  await v$.value.$validate();

  errors.value = [];

  if (!v$.value.$invalid) {
    console.log("Form is valid!", product);
    console.log("📤 Gửi sản phẩm lên Parent:", product.value);
    emit("insertProduct", product.value);

    closeModal();
  } else {
    console.log("Form has errors!", v$.value.$errors);

    v$.value.$errors.forEach((err) => {
      errors.value.push(
        typeof err.$message === "string" ? err.$message : err.$message.value
      );
    });
  }
};

defineExpose({ openModal });
</script>

<style scoped lang="sass">
ul
  list-style-type: none
  padding: 0
  margin: 0

  li
    padding: 8px 12px
    border-bottom: 1px solid #ddd
    font-size: 16px
    color: rgb(220, 70, 70)
    &:last-child
      border-bottom: none

    &:hover
      background-color: #f5f5f5

.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #cccccc25
  display: flex
  align-items: center
  justify-content: center

  .modal-content
    padding: 20px
    border-radius: 10px
    width: 300px
    background: rgb(180, 175, 175)
    animation: fadeIn .5s ease-in-out

    &.show
      opacity: 1
      transform: translateY(0)

    label
      display: block
      margin-bottom: 8px
      font-weight: bold

    input
      width: 100%
      padding: 8px
      margin-bottom: 16px
      border: 1px solid #ccc
      border-radius: 5px

    .modal-actions
      display: flex
      justify-content: space-between
      margin-top: 10px

      button
        padding: 10px 15px
        border: none
        border-radius: 5px
        cursor: pointer
        font-size: 14px

        &:first-child
          background: #4caf50
          color: white

        &:last-child
          background: #f44336
          color: white

        &:hover
          opacity: 0.8
</style>
