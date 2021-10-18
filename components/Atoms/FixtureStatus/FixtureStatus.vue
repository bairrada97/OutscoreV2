<template>
  <span class="fixturesStatus">{{ status }}</span>
</template>

<script setup>
const props = defineProps({
  status: String,
});
</script>

<style lang="scss" scoped>
.fixturesStatus {
  font-weight: 600;
}
</style>
