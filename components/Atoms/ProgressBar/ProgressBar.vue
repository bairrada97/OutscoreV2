<template>
    <div class="progressBar" :style="{ width: width }" :data-id="index"></div>
</template>

<script setup>
const props = defineProps({
    width: String,
    index: String
});
</script>

<style lang="scss" scoped>
.progressBar {
    height: 100%;
    background-color: var(--color-primary);
    z-index: 2;

    &[data-index='1'] {
        background-color: var(--color-bg--black);
    }
}
</style>
