<template>
    <span class="fixtureOutcome" :class="renderClasses.class"> {{ renderClasses.short }}</span>
</template>

<script setup>
const props = defineProps({
    fixtureOutcome: String
});

const classes = {
    win: {
        class: 'fixtureOutcome__teamWon',
        short: 'W'
    },
    draw: {
        class: 'fixtureOutcome__teamDraw',
        short: 'D'
    },
    lose: {
        class: 'fixtureOutcome__teamLost',
        short: 'L'
    }
};

const renderClasses = computed(() => {
    const fixtureOutcome = Object.keys(classes).find((item) => item == props.fixtureOutcome);

    return classes[fixtureOutcome];
});
</script>

<style lang="scss" scoped>
.fixtureOutcome {
    width: 22px;
    height: 22px;
    border-radius: 1px;
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    &__teamWon {
        background: var(--color-primary);
    }

    &__teamDraw {
        background: #797979;
    }

    &__teamLost {
        background: #d26d6d;
    }
}
</style>
