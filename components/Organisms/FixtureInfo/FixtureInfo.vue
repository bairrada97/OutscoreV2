<template>
    <div class="fixtureInfo">
        <div class="fixtureInfo__container">
            <div class="fixtureInfo__teamsContainer" v-if="fixtureDetail.teams">
                <div class="fixtureInfo__teams" v-for="team in fixtureDetail.teams" :key="team.id">
                    <AtomsLogo v-if="team.logo" :logo="team.logo" :name="team.name" />
                    <AtomsLogoName :name="team.name" />
                </div>
                <div class="fixtureInfo__statusContainer">
                    <MoleculesFixtureInfoStatus :fixtureDetail="fixtureDetail" />
                </div>
            </div>
            <div class="fixtureInfo__timerContainer">
                <MoleculesFixtureInfoTimer :fixtureDetail="fixtureDetail" />
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    fixtureDetail: Object
});
</script>

<style lang="scss" scoped>
.fixtureInfo {
    background-color: #797979;
    color: #fff;
    padding: 24px 16px;
    min-height: 160px;

    &__teamsContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 16px;
    }

    &__teams {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__statusContainer {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4px;
    }
}
</style>
