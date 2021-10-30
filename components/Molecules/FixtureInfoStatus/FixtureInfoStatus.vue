<template>
    <div class="fixtureInfoStatus">
        <div class="fixtureInfoStatus__score" v-if="!fixtureWillNotStart">
            <AtomsFixtureStatus v-for="(score, index) in fixture.goals" :key="index" :status="score || 0" />
        </div>
        <span class="fixtureInfoStatus__extraInfo" v-if="fixtureHasntStarted">{{ displayTimeLeftForGameStart }}</span>
        <div class="fixtureInfoStatus__extraInfo" v-if="isPenalty">
            <span>{{ penaltyText }}</span>
            <span class="fixtureInfoStatus__extraInfoContainer">
                <span class="fixtureInfoStatus__extraScore" v-for="(score, index) in fixture.score.penalty" :key="index"> {{ score }} </span>
                <span class="fixtureInfoStatus__extraScore--divider"> - </span>
            </span>
        </div>
        <span class="fixtureInfoStatus__extraInfo">{{ isStatusIncluded ? fixture.fixture.status.long : fixture.fixture.status.elapsed }} </span>
    </div>
</template>

<script setup>
const props = defineProps({
    fixture: Object
});
const penaltyText = ref('Penalties');
const fixtureWillNotStartStatus = ref(['CANC', 'PST', 'ABD', 'WO', 'INT']);
const shortNamesStatus = ref(['CANC', 'PST', 'ABD', 'WO', 'FT', 'HT']);

const isPenalty = computed(() => props.fixture.fixture.status.short == 'PEN');
const fixtureWillNotStart = computed(() => fixtureWillNotStartStatus.value.includes(props.fixture.fixture.status.short));
const isStatusIncluded = computed(() => shortNamesStatus.value.includes(props.fixture.fixture.status.short));
const fixtureHasntStarted = computed(() => props.fixture.fixture.status.short == 'NS' && seconds.value > 0);

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const timer = ref(null);

const displayTimeLeftForGameStart = computed(() => {
    if (days.value > 0) {
        return days.value + 1 + ' days left';
    } else {
        return hours.value + ':' + minutes.value + ':' + seconds.value;
    }
});

const setTimer = () => {
    const gameDate = props.fixture?.fixture.date;
    const timeLeftForGameStart = new Date(gameDate).getTime() - new Date().getTime();
    days.value = Math.floor(timeLeftForGameStart / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeLeftForGameStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((timeLeftForGameStart % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((timeLeftForGameStart % (1000 * 60)) / 1000);

    hours.value = hours.value < 10 ? '0' + hours.value : hours.value;
    minutes.value = minutes.value < 10 ? '0' + minutes.value : minutes.value;
    seconds.value = seconds.value < 10 ? '0' + seconds.value : seconds.value;

    if (timeLeftForGameStart < 0) clearInterval(timer.value);
};

onBeforeUnmount(() => {
    clearInterval(timer.value);
});

onMounted(() => {
    setTimer();
    timer.value = setInterval(function () {
        setTimer();
    }, 1000);
});
</script>

<style lang="scss" scoped>
.fixtureInfoStatus {
    display: grid;
    gap: 5px 16px;
    text-align: center;
    &__score {
        display: grid;
        gap: 5px 16px;
        text-align: center;
        grid-template-columns: 1fr 1fr;
        grid-column: 1/-1;
        font-size: 20px;
        font-weight: 700;
    }

    &__extraInfo {
        grid-column: 1/-1;
        grid-row: 2;
        text-align: center;
    }

    &__extraInfoContainer {
        display: grid;
    }

    &__extraScore {
        font-size: 14px;
        font-weight: 700;
        grid-row: 1;

        &--divider {
            grid-column: 2;
            grid-row: 1;
        }
    }
}
</style>
