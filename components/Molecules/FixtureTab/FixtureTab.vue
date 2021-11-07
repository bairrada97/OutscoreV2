<template>
    <div class="fixtureTab" v-if="title == selectedTab">
        <slot />
    </div>
</template>

<script setup>
import store from '@/store.js';

const props = defineProps({
    title: String
});
const selectedTab = computed(() => store.getSelectedTab());
</script>

<style lang="scss" scoped></style>
