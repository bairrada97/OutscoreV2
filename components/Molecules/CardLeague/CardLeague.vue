<template>
  <div class="cardLeague">
    <AtomsLogo :logo="getFirstElement.league.logo" :name="name" />
    <AtomsLogoName :name="name" />
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
  league: Array,
});


const getLeague = props.league.values();
const getFirstElement = getLeague.next().value;
</script>

<style lang="scss" scoped>
.cardLeague {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 0 16px;
  padding: 8px 16px;
  align-items: center;
  background-color: var(--color-bg);
}
</style>
