<template>
    <div class="dropdown" :class="{ isOpen: isOpen }" @click="toggleDropdown()">
        <slot />
    </div>
</template>

<script setup>
const isOpen = ref(false);
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.dropdown {
    &.isOpen {
        border: 1px solid rgba(183, 183, 183, 0.3);
    }
}
</style>
