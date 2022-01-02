<template>
    <div class="fixtureH2H__container" v-if="isActive" :type="type">
        <h3 class="fixtureH2H__title">{{ title }}</h3>
        <div class="fixtureH2H__fixtures">
            <MoleculesCardGame v-show="index < VISIBLE_MATCHES" v-for="(fixture, index) in team" :key="fixture.fixture.id" :game="fixture" type="H2H" :fixtureOutcome="getFixtureOutcome(fixture)" />
        </div>

        <button class="fixtureH2H__viewAllMatches" v-if="team.length > 5 && VISIBLE_MATCHES != TOTAL_VISIBLE_MATCHES" @click="showAllMatches()">
            <span>show more matches</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9973 13H13.9973V19H11.9973V13H5.99731V11H11.9973V5H13.9973V11H19.9973V13Z" fill="#797979" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import store from '@/store.js';
const props = defineProps({
    fixtureDetail: Object,
    team: Object,
    key: String,
    type: String,
    title: String,
    isActive: Boolean
});

const VISIBLE_MATCHES = ref(5);
const TOTAL_VISIBLE_MATCHES = ref(41);

const showAllMatches = () => {
    VISIBLE_MATCHES.value = TOTAL_VISIBLE_MATCHES.value;
};

const getFixtureOutcome = (match) => {
    const matchTeamWinner = Object.values(match.teams).find((item) => !!item.winner);
    const draw = matchTeamWinner?.id == undefined;
    let fixtureOutcome;
    if (props.type == 'overall') return;

    if (matchTeamWinner?.id == undefined) {
        fixtureOutcome = 'draw';
    } else {
        if (matchTeamWinner?.id == props.fixtureDetail.teams[props.type]?.id) {
            fixtureOutcome = 'win';
        } else {
            fixtureOutcome = 'lose';
        }
    }

    return fixtureOutcome;
};
</script>

<style lang="scss" scoped>
.fixtureH2H {
    margin-bottom: 40px;

    &__container {
        display: grid;
        border: 1px solid #c7c7c7;
    }
    &__title {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 8px 16px;
        background-color: #dadada;
        grid-column: 1/-1;
    }

    &__viewAllMatches {
        color: #797979;
        font-weight: 600;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 12px;
        border: 1px dashed #dcdcdc;
    }
}
</style>
