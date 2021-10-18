<template>
  <h3 class="countryName">{{ name }}</h3>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>

<style lang="scss" scoped>
.countryName {
  font-size: 14px;
  font-weight: 400;
}
</style>
