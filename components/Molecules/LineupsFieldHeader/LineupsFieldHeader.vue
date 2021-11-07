<template>
    <div class="lineupsFieldHeader" v-if="team.formation">
        <span class="lineupsFieldHeader__teamName">{{ team.team.name }}</span>
        <span class="lineupsFieldHeader__formation">{{ team.formation }}</span>
    </div>
</template>

<script setup>
import store from '@/store.js';

const props = defineProps({
    team: Object
});
</script>

<style lang="scss" scoped>
.lineupsFieldHeader {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
}
</style>
