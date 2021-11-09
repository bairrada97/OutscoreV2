<template>
    <div class="fixtureLineups" v-if="fixtureDetail.lineups && fixtureDetail.lineups.length > 0">
        <div class="fixtureLineups__container" :data-id="index" v-for="(team, index) in fixtureDetail.lineups" :key="team.team.id">
            <MoleculesLineupsFieldHeader :team="team" />
            <OrganismsLineupsFieldGrid :team="team" />
        </div>
        <figure v-if="fixtureDetail.lineups[0].formation">
            <img class="fixtureLineups__field" height="539" src="/field.png" />
        </figure>
        <div class="fixtureLineups__teamList">
            <MoleculesDropdown v-for="team in matchDetail.lineups" :key="team.team.id" @click="openTeamLineup(team.team.name)">
                <!-- <div class="fixtureLineups__cardContainer">
                    <CardTeamLineup :team="team">
                        <div class="fixtureLineups__teamListContainer" v-if="getOpenTeamLineup(team.team.name)">
                            <div class="fixtureLineups__bench" v-if="team.coach">
                                <CardPlayerLineup :player="team.coach" />
                            </div>
                            <CardPlayerLineup :player="player.player" v-for="player in team.startXI" :key="player.player.id" :events="getPlayerEvents(player.player.id)" />
                            <div class="fixtureLineups__bench" v-if="team.substitutes">
                                <span class="fixtureLineups__title">Bench</span>
                                <CardPlayerLineup :player="player.player" v-for="player in team.substitutes" :key="player.player.id" :events="getPlayerEvents(player.player.id)" />
                            </div>
                            <div class="fixtureLineups__injuried" v-if="matchInjuries.length > 0">
                                <span class="fixtureLineups__title">Injured and suspended players</span>
                                <CardPlayerLineup :player="player.player" v-for="player in renderInjuriesByTeam(team.team.id)" :key="player.player.id" :injury="player.player" />
                            </div>
                        </div>
                    </CardTeamLineup>
                </div> -->
            </MoleculesDropdown>
        </div>
    </div>
</template>

<script setup>
import store from '@/store.js';
import useInjuries from '@/utils/useInjuries';

const props = defineProps({
    fixtureDetail: Object
});

const { players, events, fixture } = props.fixtureDetail;

const getPlayerEvents = (playerID) => events.value.filter((event) => event.player.id == playerID);
</script>

<style lang="scss" scoped>
.fixtureLineups {
    $this: &;
    padding: 24px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    &__container {
        grid-column: 1/-1;
        display: flex;
        gap: 24px 0;
        &[data-id='0'] {
            grid-row: 1;
            flex-direction: column;
        }

        &[data-id='1'] {
            grid-row: 2;
            flex-direction: column-reverse;
        }
    }

    &__summary {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 600;
    }

    figure {
        position: relative;
        grid-column: 1/-1;
        grid-row: 1/3;
        width: 100%;
        border: 1px solid #dadada;
        z-index: -1;
        display: flex;
        align-items: center;
        margin: 42px auto;
        justify-content: center;
        background-color: #f1f1f1;
        margin-bottom: 24px;

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dadada;
        }
    }

    &__teamList {
        display: grid;
        grid-template-columns: 1fr;
        grid-column: 1/-1;
    }

    &__eventsLabels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column: 1/-1;
        margin-top: 24px;
        padding: 0 16px;
        gap: 8px 0;
    }

    &__cardContainer {
        display: grid;
        grid-template-columns: 40px 1fr auto auto;
        gap: 0 16px;
        padding: 8px 16px;
        align-items: center;

        border-bottom: 1px solid rgba(183, 183, 183, 0.3);
    }

    &__teamListContainer {
        grid-column: 1/6;
        background: white;
        padding: 16px 0;
        display: grid;
        gap: 16px 0;
    }

    &__bench,
    &__injuried {
        border-top: 1px solid #dcdcdc;
        display: grid;
        gap: 16px 0;
    }

    &__title {
        display: block;
    }
}

.matchLineupsCard {
    $this: &;
}
</style>
