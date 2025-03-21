<script setup lang="ts">
import { ref } from "vue";

defineProps({
  text: { type: String, required: true }, // Tooltip text
  position: {
    type: String,
    default: "top", // top, bottom, left, right
    validator: (value: string) =>
      ["top", "bottom", "left", "right"].includes(value),
  },
});

const isHovered = ref(false);
</script>

<template>
  <div
    class="tooltip-container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot></slot>
    <!-- Content inside tooltip -->
    <div v-show="isHovered" class="tooltip" :class="position">
      {{ text }}
    </div>
  </div>
</template>

<style lang="sass" scoped>

.tooltip-container
  position: relative

.tooltip
  position: absolute
  background-color: black
  color: white
  padding: 5px 10px
  border-radius: 5px
  white-space: nowrap
  z-index: 10
  font-size: 12px
  opacity: 0.9

  &.top
    bottom: 100%
    left: 50%
    transform: translateX(-50%)
    margin-bottom: 5px

  &.bottom
    top: 100%
    left: 50%
    transform: translateX(-50%)
    margin-top: 5px

  &.left
    right: 100%
    top: 50%
    transform: translateY(-50%)
    margin-right: 5px

  &.right
    left: 100%
    top: 50%
    transform: translateY(-50%)
    margin-left: 5px
</style>
