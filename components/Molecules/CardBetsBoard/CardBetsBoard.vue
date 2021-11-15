<template>
    <div class="cardBetsBoard">
        <header>
            <div>
                <AtomsLogo :logo="fixtureDetail.teams.home.logo" :name="fixtureDetail.teams.home.name" />

                <!-- <span class="cardBetsBoard__teamRank" v-if="renderTeamRank(fixtureDetail.teams.home.id)">({{ renderTeamRank(fixtureDetail.teams.home.id).rank }}º)</span> -->
            </div>
            <h2>{{ title }}</h2>
            <div>
                <!-- <span class="cardBetsBoard__teamRank" v-if="renderTeamRank(fixtureDetail.teams.home.id)">({{ renderTeamRank(fixtureDetail.teams.away.id).rank }}º)</span> -->
                <AtomsLogo :logo="fixtureDetail.teams.away.logo" :name="fixtureDetail.teams.away.name" />
            </div>
        </header>
        <div class="cardBetsBoard__content" v-if="type == 'H2H'">
            <div class="cardBetsBoard__info" v-for="(team, index) of getBoardInfo.matches" :key="index">
                <AtomsBetsBoardFixturesNumber :teamFixtureNumber="team" />
            </div>
        </div>
        <div class="cardBetsBoard__content" v-if="type == 'All'">
            <div class="cardBetsBoard__container" v-for="(boardInfo, index) of getBoardInfo.matches" :key="index">
                <div class="cardBetsBoard__info" v-for="(team, index) of boardInfo" :key="index">
                    <AtomsBetsBoardFixturesNumber :teamFixtureNumber="team" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    fixtureDetail: Object,
    getBoardInfo: Object,
    title: String,
    type: String
});
const getTeamsFromStandings = computed(() => store.getTeamsFromStandings());
const renderTeamRank = (team) => getTeamsFromStandings?.value?.find((teamFromStandings) => teamFromStandings.team.id == team);
</script>

<style lang="scss" scoped>
.cardBetsBoard {
    background: #797979;
    display: grid;
    padding: 16px;
    color: #fff;
    font-weight: 600;
    gap: 16px 0;
    margin-bottom: 24px;

    header,
    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__teamRank {
        font-size: 12px;
    }

    &__container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0 8px;
    }
}
</style>
