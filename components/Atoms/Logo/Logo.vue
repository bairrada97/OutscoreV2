<template>
    <img class="countryFlag" width="24" height="24" :src="logo" :alt="name + ' logo'" lazy="loading" priority="low" />
</template>

<script setup>
const props = defineProps({
    logo: String,
    name: String
});
</script>

<style lang="scss" scoped>
.countryFlag {
    box-sizing: content-box;
}
</style>
