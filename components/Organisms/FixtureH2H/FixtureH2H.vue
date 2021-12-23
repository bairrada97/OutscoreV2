<template>
    <div class="fixtureH2H">
        <MoleculesFiltersWrapper :filters="H2HFilters"></MoleculesFiltersWrapper>

        <MoleculesFixtureH2HList v-for="(team, index) in data" :key="index" :team="team" :fixtureDetail="fixtureDetail" :isActive="showFixtureContainer(H2HFilters[index].type)" />

        <!--

		<div class="matchH2H__container" v-if="h2h.length">
			<h3 class="matchH2H__title">head to head</h3>
			<div class="matchH2H__matches">
				<CardGame v-if="showMatches(index, 0)" v-for="(match, index) in h2h" :key="match.fixture.id" :game="match" type="H2H" />
			</div>
		</div>
		<button v-if="showViewAllButton(h2h, 0)" class="matchH2H__viewAllMatches" @click="showAllMatchesEvent(0)">
			<span>show more matches</span>
			<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.9973 13H13.9973V19H11.9973V13H5.99731V11H11.9973V5H13.9973V11H19.9973V13Z" fill="#797979" />
			</svg>
		</button>
		<div class="matchH2H__container" v-if="homeTeamH2H.length">
			<h3 class="matchH2H__title">Last Matches: {{ matchDetail.teams.home.name }}</h3>
			<div class="matchH2H__matches">
				<CardGame v-if="showMatches(index, 1)" v-for="(match, index) in homeTeamH2H" :key="match.fixture.id" :game="match" type="H2H" :team="matchDetail.teams.home.id" :winCondition="getWinCondition(match, 'home')" />
			</div>
		</div>
		<button v-if="showViewAllButton(homeTeamH2H, 1)" class="matchH2H__viewAllMatches" @click="showAllMatchesEvent(1)">
			<span>show more matches</span>
			<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.9973 13H13.9973V19H11.9973V13H5.99731V11H11.9973V5H13.9973V11H19.9973V13Z" fill="#797979" />
			</svg>
		</button>
		<div class="matchH2H__container" v-if="awayTeamH2H.length">
			<h3 class="matchH2H__title">Last Matches: {{ matchDetail.teams.away.name }}</h3>
			<div class="matchH2H__matches">
				<CardGame v-if="showMatches(index, 2)" v-for="(match, index) in awayTeamH2H" :key="match.fixture.id" :game="match" type="H2H" :team="matchDetail.teams.away.id" :winCondition="getWinCondition(match, 'away')" />
			</div>
		</div>
		<button v-if="showViewAllButton(awayTeamH2H, 2)" class="matchH2H__viewAllMatches" @click="showAllMatchesEvent(2)">
			<span>show more matches</span>
			<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.9973 13H13.9973V19H11.9973V13H5.99731V11H11.9973V5H13.9973V11H19.9973V13Z" fill="#797979" />
			</svg>
		</button>
        -->
    </div>
</template>
<script setup>
import useH2H from '@/utils/useH2H';
import store from '@/store.js';

const props = defineProps({
    fixtureDetail: Object
});

const { loadH2H } = useH2H();

const { data, refresh } = await useAsyncData(`fixtureH2H`, () => {
    return loadH2H(props.fixtureDetail.teams);
});
const { h2h, homeTeam, awayTeam } = data.value;

const H2HFilters = ref([
    {
        name: 'Overall',
        type: 'Home,Away'
    },
    {
        name: props.fixtureDetail.teams.home.name,
        type: 'Home'
    },
    {
        name: props.fixtureDetail.teams.away.name,
        type: 'Away'
    }
]);

const getSelectedBetsHelperFilter = computed(() => store.getSelectedBetsHelperFilter());
const showFixtureContainer = (type) => {
    return type.includes(getSelectedBetsHelperFilter.value.type);
};
</script>

<style lang="scss" scoped>
.fixtureH2H {
    margin-top: 24px;
    margin-bottom: 40px;

    &__container {
        display: grid;
        border: 1px solid #c7c7c7;
        margin-top: 24px;
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
        margin-top: 8px;
        padding: 12px;
        border: 1px dashed #dcdcdc;
    }
}
</style>
