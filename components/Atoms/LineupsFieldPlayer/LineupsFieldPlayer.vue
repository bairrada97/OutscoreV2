<template>
    <div class="lineupsFieldPlayer">
        <span class="lineupsFieldPlayer__number">{{ number }}</span>
        <span class="lineupsFieldPlayer__name">{{ name }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    number: Number,
    name: String
});
</script>

<style lang="scss" scoped>
.lineupsFieldPlayer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &__number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background-color: #fff;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        border-radius: 50%;
    }

    &__name {
        font-size: 12px;
        line-height: 15px;
        border-radius: 50%;
        color: #212121;
        font-weight: 600;
        text-align: center;
    }
}
</style>
