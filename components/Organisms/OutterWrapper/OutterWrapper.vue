<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import store from '@/store.js';

export default {
    components: {},
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.outterWrapper {
    &:last-of-type {
        margin-bottom: 55px;
    }
}
</style>
