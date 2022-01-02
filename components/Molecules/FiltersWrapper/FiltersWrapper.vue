<template>
    <div class="filtersWrapper">
        <ul class="filtersWrapper__list">
            <li class="filtersWrapper__tab" v-for="tab in filters" :key="tab.name" :class="{ selected: selectedFilter == tab.name }" @click="selectFilter(tab)" :type="tab.type">{{ tab.name }}</li>
        </ul>
        <slot />
    </div>
</template>

<script setup>
import store from '@/store.js';
const props = defineProps({
    filters: Array
});
const selectedFilter = ref(props.filters[0]);
store.setSelectedBetsHelperFilter(selectedFilter.value);

const selectFilter = (tab) => {
    selectedFilter.value = tab;
    store.setSelectedBetsHelperFilter(tab);
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
