<template>
    <div :class="{ isGameLive: isGameLive, goalScored: homeTeamScored || awayTeamScored }" class="cardGame">
        <AtomsFixtureStatus :status="renderFixtureStatus" />
        <div class="cardGame__teamsContainer">
            <div class="cardGame__team" :class="{ teamScored: homeTeamScored }">
                <span class="cardGame__team__goal">{{ game.score.penalty.home ? game.score.penalty.home : game.goals.home }}</span>
                <span class="cardGame__team__name">{{ game.teams.home.name }}</span>
            </div>
            <div class="cardGame__team" :class="{ teamScored: awayTeamScored }">
                <span class="cardGame__team__goal">{{ game.score.penalty.away ? game.score.penalty.away : game.goals.away }}</span>
                <span class="cardGame__team__name">{{ game.teams.away.name }}</span>
            </div>
        </div>

        <svg v-if="type != 'H2H'" class="cardGame__favoriteIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.81 9.12L22 9.74L16.55 14.47L18.18 21.5L12 17.77L5.82 21.5L7.46 14.47L2 9.74L9.19 9.13L12 2.5L14.81 9.12ZM8.24 18.17L12 15.9L15.77 18.18L14.77 13.9L18.09 11.02L13.71 10.64L12 6.6L10.3 10.63L5.92 11.01L9.24 13.89L8.24 18.17Z" fill="#212121" />
            </g>
        </svg>
        <svg v-if="type != 'H2H'" class="cardGame__viewMoreIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18Z" fill="#212121" />
        </svg>
        <span v-if="winCondition != undefined" :class="winCondition == 1 ? 'cardGame__teamWon' : winCondition == 0 ? 'cardGame__teamDrew' : 'cardGame__teamLost'">
            {{ winCondition == 1 ? 'W' : winCondition == 0 ? 'D' : 'L' }}
        </span>
    </div>
</template>

<script setup>
import useFixtureStatus from '@/utils/useFixtureStatus';

const props = defineProps({
    game: Object,
    type: String,
    winCondition: [String, Number]
});
console.log(props.game.fixture.status.elapsed);
const { renderFixtureStatus, isGameLive } = useFixtureStatus(props.game, props.type);
const homeTeamScored = ref('');
const awayTeamScored = ref('');

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

    &__team {
        display: flex;
        gap: 0 8px;

        &.teamScored {
            font-weight: 600;
        }
    }

    &__viewMoreIcon {
        box-sizing: content-box;
    }

    &__teamWon {
        width: 22px;
        height: 22px;
        background: var(--color-primary);
        border-radius: 1px;
        font-weight: 600;
        color: #fff;
        text-align: center;
    }

    &__teamDrew {
        width: 22px;
        height: 22px;
        background: #797979;
        border-radius: 1px;
        font-weight: 600;
        color: #fff;
        text-align: center;
    }

    &__teamLost {
        width: 22px;
        height: 22px;
        background: #d26d6d;
        border-radius: 1px;
        font-weight: 600;
        color: #fff;
        text-align: center;
    }
}
</style>
