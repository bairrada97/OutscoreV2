<template>
    <div class="filtersWrapper">
        <ul class="filtersWrapper__list">
            <li class="filtersWrapper__tab" v-for="tab in betsHelperFilters" :key="tab" :class="{ selected: selectedFilter == tab }" @click="selectFilter(tab)">{{ tab }}</li>
        </ul>

        <slot />
    </div>
</template>

<script setup>
import store from '@/store.js';

const betsHelperFilters = computed(() => store.getBetsHelperFilters());

const selectedFilter = ref(betsHelperFilters.value[0]);
store.setSelectedBetsHelperFilter(selectedFilter.value);

const selectFilter = (title) => {
    selectedFilter.value = title;
    store.setSelectedBetsHelperFilter(title);
};
</script>

<style lang="scss">
.filtersWrapper {
    overflow: hidden;
    &__list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0 8px;
        margin-bottom: 24px;
    }

    &__tab {
        padding: 8px 0;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        background: #dcdcdc;

        &.selected {
            background: var(--color-primary);
            color: #fff;
        }
    }
}
</style>
