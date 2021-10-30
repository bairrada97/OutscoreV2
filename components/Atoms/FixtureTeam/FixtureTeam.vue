<template>
    <div class="team" :class="{ teamScored: wasGoal }">
        <span class="team__goal">{{ score }}</span>
        <span class="team__name">{{ name }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    score: Number,
    name: String,
    wasGoal: Boolean
});
</script>

<style lang="scss" scoped>
.team {
    display: flex;
    gap: 0 8px;

    &.teamScored {
        font-weight: 600;
    }
}
</style>
