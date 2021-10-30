<template>
    <div class="fixtureInfoTimer">
        <div class="fixtureInfoTimer__bar">
            <div class="fixtureInfoTimer__timerProgress" v-if="fixture.fixture" :style="{ width: convertFixtureCurrentTimeInWidth(fixture.fixture.status.elapsed) }"></div>
        </div>
        <div class="fixtureInfoTimer__labelsContainer">
            <span class="fixtureInfoTimer__label" v-if="fixture.fixture">{{ getDate(fixture.fixture.timestamp) }}</span>
            <span class="fixtureInfoTimer__label">HT</span>
            <span class="fixtureInfoTimer__label">FT</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    fixture: Object
});
const getDate = (timestamp) => {
    let hours = new Date(timestamp * 1000).getHours();
    let minutes = new Date(timestamp * 1000).getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
};
const convertFixtureCurrentTimeInWidth = (time) => {
    let maxTime = 90;
    return Math.min(Math.max(parseInt((time * 100) / maxTime), 0), 100) + '%';
};
</script>

<style lang="scss" scoped>
.fixtureInfoTimer {
    &__bar {
        width: 100%;
        background-color: #fff;
        height: 4px;
    }

    &__timerProgress {
        height: 100%;
        background-color: #212121;
        z-index: 2;
    }

    &__labelsContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
    }

    &__label {
        font-size: 12px;
    }
}
</style>
