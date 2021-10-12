<script setup>
import store from "@/store.js";

const liveToggle = computed(() => store.getLiveToggle());
const toggleLive = () => store.setLiveToggle(!liveToggle.value);
</script>

<template>
  <nav class="calendarBar">
    <A-LiveToggle @click="toggleLive" :isLive="liveToggle" />
  </nav>
</template>

<style lang="scss" scoped>
.calendarBar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  background: #f1f1f1;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
