<template>
    <li class="betsHelperCategory">
        <h3 class="betsHelperCategory__title">{{ name }}</h3>
        <div class="betsHelperCategory__stats" v-for="(subCategory, index) in category" :key="index">
            <MoleculesCardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLength" />
        </div>
    </li>
</template>

<script setup>
const props = defineProps({
    name: String,
    category: Object,
    lastGamesLength: Number
});
</script>

<style lang="scss" scoped>
.betsHelperCategory {
    display: grid;
    gap: 24px 0;
    padding-bottom: 24px;
    &__title {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 8px 16px;
        background-color: #dadada;
        grid-column: 1/-1;
    }

    &__stats {
        padding: 0 10px;
    }
}
</style>
