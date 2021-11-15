<template>
    <div class="betsBoardFixturesNumber">
        <span class="betsBoardFixturesNumber__number" :style="{ color: teamFixtureNumber.color, background: teamFixtureNumber.background }">{{ teamFixtureNumber.number }}</span>
        <span class="betsBoardFixturesNumber__description">{{ teamFixtureNumber.description }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    teamFixtureNumber: Object
});
</script>

<style lang="scss" scoped>
.betsBoardFixturesNumber {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 8px;
    text-align: center;
    min-width: 38px;

    &__number {
        grid-column: 1;
        grid-row: 1/3;
        background-color: #e9e7e7;
        color: #212121;
        font-weight: 900;
        font-size: 20px;
        align-self: center;
        justify-self: center;
        padding: 5px 10px;
    }

    &__description {
        font-weight: 400;
        font-size: 12px;
    }
}
</style>
