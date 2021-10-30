<template>
    <span> {{ winCondition }}</span>
</template>

<script setup>
const props = defineProps({
    winCondition: String
});
</script>

<style lang="scss" scoped></style>
