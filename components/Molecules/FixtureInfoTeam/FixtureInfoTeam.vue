<template>
    <AtomsLogo v-if="team.logo" :logo="team.logo" :name="team.name" />
    <AtomsLogoName :name="team.name" />
</template>

<script setup>
import store from '@/store.js';

const props = defineProps({
    name: String,
    country: Object,
    isOpen: String
});

const liveToggle = computed(() => store.getLiveToggle());
</script>

<style lang="scss" scoped></style>
