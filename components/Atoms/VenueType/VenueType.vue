<template>
    <span class="venueType">{{ name }}</span>
</template>

<script setup>
const props = defineProps({
    name: String
});
</script>

<style lang="scss" scoped>
.venueType {
    font-size: 12px;
    font-weight: 600;
    color: #797979;
    text-transform: uppercase;
    line-height: 15px;
}
</style>
