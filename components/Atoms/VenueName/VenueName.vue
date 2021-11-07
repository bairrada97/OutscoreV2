<template>
    <span class="venueName">{{ name }}</span>
</template>

<script setup>
const props = defineProps({
    name: String
});
</script>

<style lang="scss" scoped>
.venueName {
    font-weight: 600;
    font-size: 14px;
    color: #212121;
    line-height: 18px;
}
</style>
