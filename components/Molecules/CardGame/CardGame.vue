<template>
    <nuxt-link :to="{ name: 'match', query: { fixture: game.fixture.id }, params: { match: JSON.stringify(game) } }" :class="{ isGameLive: isGameLive, goalScored: homeTeamScored || awayTeamScored }" class="cardGame">
        <AtomsFixtureStatus :status="renderFixtureStatus" />
        <div class="cardGame__teamsContainer">
            <AtomsFixtureTeam :wasGoal="homeTeamScored" :score="homeScore" :name="game.teams.home.name" />
            <AtomsFixtureTeam :wasGoal="awayTeamScored" :score="awayScore" :name="game.teams.away.name" />
        </div>
        <AtomsFavoriteIcon v-if="notH2H" />
        <AtomsViewMoreIcon v-if="notH2H" />
        <AtomsFixtureOutcomeLetter v-if="fixtureOutcome" :fixtureOutcome="fixtureOutcome" />
    </nuxt-link>
</template>

<script setup>
import useFixtureStatus from '@/utils/useFixtureStatus';

const props = defineProps({
    game: Object,
    type: String,
    fixtureOutcome: String
});
const { renderFixtureStatus, isGameLive } = useFixtureStatus(props.game, props.type);
const homeTeamScored = ref(false);
const awayTeamScored = ref(false);

const homeScore = computed(() => (props.game.score.penalty.home ? props.game.score.penalty.home : props.game.goals.home));
const awayScore = computed(() => (props.game.score.penalty.away ? props.game.score.penalty.away : props.game.goals.away));

const notH2H = props.type != 'H2H';

watch(
    () => [props.game.goals, props.game.fixture.status.elapsed],
    (newValue, prevValue) => {
        const [newGoals, newTime] = newValue;
        const [prevGoals, prevTime] = prevValue;
        if (JSON.stringify(newGoals) === JSON.stringify(prevGoals) || newTime - prevTime > 2) {
            return;
        }
        const goalScored = async () => {
            setValues(newGoals, prevGoals);
            await delay(60000);
            resetValues();
        };

        const delay = async (ms) => {
            return await new Promise((resolve) => setTimeout(resolve, ms));
        };

        const setValues = (newGoals, prevGoals) => {
            if (JSON.stringify(newGoals.away) > JSON.stringify(prevGoals.away)) z;
            setAwayTeamScored();

            if (JSON.stringify(newGoals.home) > JSON.stringify(prevGoals.home)) setHomeTeamScored();
        };

        const resetValues = () => {
            homeTeamScored.value = false;
            awayTeamScored.value = false;
        };

        const setAwayTeamScored = () => {
            homeTeamScored.value = false;
            awayTeamScored.value = true;
        };

        const setHomeTeamScored = () => {
            homeTeamScored.value = true;
            awayTeamScored.value = false;
        };

        goalScored();
    }
);
</script>

<style lang="scss" scoped>
.cardGame {
    display: grid;
    grid-template-columns: 40px 1fr auto auto;
    align-items: center;
    gap: 0 16px;
    padding: 8px 16px;
    box-sizing: border-box;

    &:not(&:last-of-type) {
        border-bottom: 1px solid rgba(183, 183, 183, 0.3);
    }

    &.isGameLive {
        border-left: 4px solid var(--color-primary);
    }

    &.goalScored {
        background-color: rgba(255, 168, 0, 0.08);
    }

    &__status {
        font-weight: 600;
    }

    &__teamsContainer {
        display: flex;
        flex-direction: column;
        gap: 4px 0;
    }
}
</style>
