<template>
  <nav class="calendarBar">
    <AtomsLiveToggle @click="toggleLive" :isLive="liveToggle" />
    <MoleculesCalendarDays />
    <AtomsCalendarButton @click="openCalendar" />
  </nav>
</template>

<script setup>
import store from "@/store.js";

const liveToggle = computed(() => store.getLiveToggle());
const toggleLive = () => store.setLiveToggle(!liveToggle.value);
const openCalendar = () => store.setCalendarOpen(true);
</script>

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
