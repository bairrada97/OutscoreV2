<template>
    <button class="viewAllButton">
        <span>{{ title }}</span>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9973 13H13.9973V19H11.9973V13H5.99731V11H11.9973V5H13.9973V11H19.9973V13Z" fill="#797979" />
        </svg>
    </button>
</template>

<script setup>
const props = defineProps({
    title: String
});
</script>

<style lang="scss" scoped>
.viewAllButton {
    color: #797979;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px;
    border: 1px dashed #dcdcdc;
}
</style>
