<template>
  <ul class="calendarDays">
    <AtomsDayHeader
      v-for="(day, index) in homepageFiveDays"
      :key="index"
      :day="day"
      :isLive="liveToggle"
      @click="onClickSelectDate(day)"
    />
  </ul>
</template>

<script setup>
import store from "@/store.js";
import useCalendar from "@/utils/useCalendar.js";

const { homepageFiveDays, selectDate } = useCalendar();
const liveToggle = computed(() => store.getLiveToggle());

const onClickSelectDate = (day) =>
  selectDate(day.getFullYear(), day.getMonth(), day.getDate());
</script>

<style lang="scss" scoped>
.calendarDays {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
