<template>
    <div class="fixtureInfo">
        <div class="fixtureInfo__container">
            <div class="fixtureInfo__teamsContainer" v-if="fixture.teams">
                <div class="fixtureInfo__teams" v-for="team in fixture.teams" :key="team.id">
                    <AtomsLogo v-if="team.logo" :logo="team.logo" :name="team.name" />
                    <AtomsLogoName :name="team.name" />
                </div>
                <div class="fixtureInfo__statusContainer">
                    <MoleculesFixtureInfoStatus :fixture="fixture" />
                </div>
            </div>
            <div class="fixtureInfo__timerContainer">
                <MoleculesFixtureInfoTimer :fixture="fixture" />
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    fixture: Object
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

    &__team {
        font-size: 12px;
        margin-top: 8px;
    }

    &__statusContainer {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4px;
    }

    &__extraInfo {
        grid-column: 1/3;
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
