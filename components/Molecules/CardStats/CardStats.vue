<template>
    <div class="cardStats">
        <div class="cardStats__container">
            <span class="cardStats__teamName">{{ team }}</span>
            <div class="cardStats__statistics" v-for="(stats, index) in statistics" :key="index">
                <span>{{ stats.value || 0 }}{{ lastGamesLength ? `/${lastGamesLength}` : '' }}</span>
                <div class="cardStats__bar">
                    <AtomsProgressBar :width="convertStatsInWidth(stats.value) + '%'" :index="index" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    team: String,
    statistics: Object,
    lastGamesLength: Number
});

const { statistics, lastGamesLength } = props;
const sumOfStatistics = Object.values(statistics).reduce((a, b) => parseInt(a.value) + parseInt(b.value));

const convertStatsInWidth = (stat) => {
    if (lastGamesLength) {
        return stat ? (parseInt(stat) * 100) / lastGamesLength : 0;
    } else {
        return stat ? (parseInt(stat) * 100) / sumOfStatistics : 0;
    }
};
</script>

<style lang="scss" scoped>
.cardStats {
    font-size: 14px;
    font-weight: 600;
    &__container {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 4px;
    }

    &__teamName {
        grid-column: 2/6;
        grid-row: 1;
        justify-self: center;
    }

    &__statistics {
        grid-column: 1/4;
        grid-row: 1;
        direction: rtl;

        &:last-of-type {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            grid-column: 4/-1;
            width: 100%;
            direction: ltr;
        }
    }

    &__bar {
        width: 100%;
        background-color: #e9e7e7;
        height: 8px;
    }

    &__statsProgress {
        height: 100%;
        background-color: var(--color-primary);
        z-index: 2;

        &[data-index='1'] {
            background-color: var(--color-bg--black);
        }
    }
}
</style>
