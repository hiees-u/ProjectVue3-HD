<script lang="ts" setup>
const props = defineProps({
  Value: {
    type: [String, Number],
    default: "",
  },
  Placeholder: {
    type: String,
    default: "",
  },
  Label: {
    type: String,
    default: "",
  },
  Disabled: {
    type: Boolean,
    default: false,
  },
  Password: {
    type: Boolean,
    default: false,
  },
});

console.log(props.Disabled);

const emit = defineEmits(["update:Value"]);
</script>

<template>
  <div class="container">
    <label :for="Label">{{ Label }}</label>
    <input
      :type="Password ? 'password' : 'text'"
      :id="Label"
      :name="Label"
      :disabled="Disabled"
      :value="Value"
      :placeholder="Placeholder"
      @input="emit('update:Value', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style lang="sass" scoped>
.container
  width: 250px
  display: flex
  flex-direction: row !important
  justify-content: space-between

input
  margin: 5px 0
  padding: 5px 5px 5px 10px

label
  padding-right: 10px
  min-width: 100px
</style>
