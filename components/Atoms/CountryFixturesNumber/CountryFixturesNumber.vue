<template>
  <span class="countryFixturesNumber">
    <span
      v-if="totalLiveFixtures"
      :class="{ countryFixturesNumber__liveFixturesNumber: isLive }"
      >{{ totalLiveFixtures }}
    </span>
    <span v-if="totalLiveFixtures && !isLive">/</span>
    <span v-if="!isLive" class="countryFixturesNumber__totalFixtures">
      {{ totalFixtures }}
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  totalFixtures: Number,
  totalLiveFixtures: Number,
  isLive: Boolean,
});
</script>

<style lang="scss" scoped>
.countryFixturesNumber {
  font-size: 14px;

  &__liveFixturesNumber {
    color: #ffa800;
  }
}
</style>
