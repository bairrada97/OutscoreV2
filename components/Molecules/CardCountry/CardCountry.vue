<template>
  <div class="cardCountry" :class="{ isOpen: isOpen }">
    <div class="cardCountry__container">
      <AtomsLogo v-if="country.image" :logo="country.image" :name="name" />
      <AtomsLogoName :name="name" />
      <AtomsCountryFixturesNumber
        :totalLiveFixtures="country.totalLiveGames"
        :totalFixtures="country.totalGames"
        :isLive="liveToggle"
      />
      <AtomsDropdownIcon />
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import store from "@/store.js";

const props = defineProps({
  name: String,
  country: Object,
  isOpen: String,
});

const liveToggle = computed(() => store.getLiveToggle());
const hasLiveGames = computed(() => props.country.value.totalLiveGames);
</script>

<style lang="scss" scoped>
.cardCountry {
  $this: &;

  &__container {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 0 16px;
    padding: 8px 16px;
    align-items: center;
    border-bottom: 1px solid rgba(183, 183, 183, 0.3);
  }

  &.isOpen {
    border: 1px solid rgba(183, 183, 183, 0.3);

    #{$this}__container {
      background: var(--color-bg--black);
      color: white;
      position: sticky;
      top: 48px;
    }
    .dropdownIcon {
      color: #fff;
      transform: rotateX(180deg);
      box-sizing: content-box;
    }
  }

  .dropdownIcon {
    grid-column: -1;
    transition: transform 0.3s ease;
  }

  .countryName {
    grid-column: 2;
  }
}
</style>
