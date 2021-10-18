<template>
  <li class="dayHeader" :class="[activeState, todayState]">
    <span class="dayHeader__numericDay">{{
      day.toLocaleDateString("en-GB", { day: "numeric" })
    }}</span>
    <span class="dayHeader__weekDay">{{
      day.toLocaleDateString("en-GB", { weekday: "short" })
    }}</span>
  </li>
</template>

<script setup>
import useCalendar from "@/utils/useCalendar.js";
import store from "@/store.js";

const props = defineProps({
  day: Date,
  isLive: Boolean,
});
const { day, isLive } = toRefs(props);
const { currentSelectedDayClass, currentDateClass } = useCalendar();
const getRawSelectedDate = computed(() => store.getRawSelectedDate());
const isToday = (day) =>
  getRawSelectedDate.value?.toDateString() == day?.toDateString();

const todayState = computed(() => {
  return !isLive.value && isToday(day.value)
    ? currentSelectedDayClass(
        day.value.getFullYear(),
        day.value.getMonth(),
        day.value.getDate()
      )
    : "";
});

const activeState = computed(() => {
  return currentDateClass(
    day.value.getFullYear(),
    day.value.getMonth(),
    day.value.getDate()
  );
});
</script>

<style lang="scss" scoped>
.dayHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.selectedDate {
    color: var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
  }

  &.activeDay {
    color: var(--color-primary);
  }

  &__numericDay {
    font-size: 20px;
  }

  &__weekDay {
    font-size: 12px;
  }
}
</style>
