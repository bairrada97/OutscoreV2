<template>
    <div class="cardPlayerLineup">
        <AtomsLogo v-if="player.photo" :logo="player.photo" :name="player.name" />
        <span class="cardPlayerLineup__playerNumber" v-if="player.number">{{ player.number }}</span>
        <span class="cardPlayerLineup__playerName" v-if="player.name">{{ player.name }}</span>
        <div v-if="events"><img v-for="(event, index) in events" :key="index" :src="getEventIcon(event.detail)" /></div>
        <div v-if="injury"><img :src="getInjuryIcon(injury)" /></div>
    </div>
</template>

<script setup>
const props = defineProps({
    player: Object,
    events: Array,
    injury: Object
});

const getEventIcon = (typeDetail) => {
    switch (typeDetail) {
        case 'Normal Goal':
            return '/icons/event__goal.svg';
        case 'Own Goal':
            return '/icons/event__owngoal.svg';
        case 'Penalty':
            return '/icons/event__penaltyGoal.svg';
        case 'Missed Penalty':
            return '/icons/event__penaltyMissed.svg';
        case 'Yellow Card':
            '/icons/event__cardYellow.svg';
        case 'Second Yellow Card':
            return '/icons/event__cardYellow.svg';
        case 'Red Card':
            return '/icons/event__cardRed.svg';
        case 'Goal Cancelled':
            return '/icons/event__cardRed.svg';
        case 'Penalty Confirmed':
            return '/icons/event__penaltyGoal.svg';
    }
};

const getInjuryIcon = (typeDetail) => {
    const isInjury = typeDetail.reason.includes('Injury');
    const isRedCard = typeDetail.reason.includes('Red Card');
    const isQuestionable = typeDetail.type.includes('Questionable');

    if (isInjury) return '/icons/injury.svg';
    if (isRedCard) return '/icons/event__cardRed.svg';
    if (isQuestionable) return '/icons/questionableInjury.svg';
};
</script>

<style lang="scss" scoped>
.cardPlayerLineup {
    display: grid;
    font-weight: 600;
    grid-template-columns: 40px 1fr auto;
    gap: 0 10px;

    &__playerName {
        width: 100%;
    }
}
</style>
