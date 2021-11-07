<template>
    <div class="fixtureOverview" v-if="fixtureDetail">
        <div class="fixtureOverview__period" v-for="(periods, name) in reversePeriods" :key="name">
            <h3 class="fixtureOverview__periodName" v-if="periods.period.includes('first') || periods.period.includes('second')">{{ periods.period }} Half</h3>
            <h3 class="fixtureOverview__periodName" v-else>{{ periods.period }}</h3>
            <div class="fixtureOverview__periodTeam">
                <MoleculesCardEvent v-for="(event, index) in periods.events" :key="index" :event="event" />
            </div>
        </div>
        <MoleculesCardVenue :venue="displayVenue" />
    </div>
</template>
<script setup>
import useObjectHelper from '@/utils/useObjectHelper.js';

const props = defineProps({
    fixtureDetail: Object
});

const { setObjectKey, getObjectKey } = useObjectHelper();
const homeTeam = computed(() => props.fixtureDetail.teams.home);
const isHomeSideEvent = (team) => team.id == homeTeam.value.id;
const addSideToEventObject = (event, value) => (event['side'] = value);
const getHalfs = {
    firstHalf: (time) => time.elapsed <= 45,
    secondHalf: (time) => time.elapsed > 45 && time.elapsed <= 90,
    extraTime: (time, comments) => time.elapsed > 90 && time.elapsed <= 120 && comments !== 'Penalty Shootout',
    penaltyShootout: (time, comments) => comments == 'Penalty Shootout'
};
const displayEventsLogic = (acc, event) => {
    let { time, comments, team } = event;

    if (getHalfs.firstHalf(time)) {
        isHomeSideEvent(team) ? addSideToEventObject(event, 'home') : addSideToEventObject(event, 'away');
        getObjectKey(acc, 'first').add(event);
    }
    if (getHalfs.secondHalf(time)) {
        isHomeSideEvent(team) ? addSideToEventObject(event, 'home') : addSideToEventObject(event, 'away');
        getObjectKey(acc, 'second').add(event);
    }
    if (getHalfs.extraTime(time, comments)) {
        isHomeSideEvent(team) ? addSideToEventObject(event, 'home') : addSideToEventObject(event, 'away');
        getObjectKey(acc, 'overtime').add(event);
    }
    if (getHalfs.penaltyShootout(time, comments)) {
        isHomeSideEvent(team) ? addSideToEventObject(event, 'home') : addSideToEventObject(event, 'away');
        getObjectKey(acc, 'penalty').add(event);
    }
};

const displayEvents = computed(() => {
    return props.fixtureDetail.events?.reduce((acc, event) => {
        let { time, comments } = event;
        if (getHalfs.firstHalf(time)) setObjectKey(acc, 'first');
        if (getHalfs.secondHalf(time)) setObjectKey(acc, 'second');
        if (getHalfs.extraTime(time, comments)) setObjectKey(acc, 'overtime');
        if (getHalfs.penaltyShootout(time, comments)) setObjectKey(acc, 'penalty');

        setObjectKey(event, 'side');
        displayEventsLogic(acc, event);
        return acc;
    }, {});
});

const displayVenue = computed(() => {
    const { date, venue, referee, status } = props.fixtureDetail.fixture;
    const { name, round } = props.fixtureDetail.league;
    const getReferee = () => {
        if (status.short == 'NS') {
            return referee || 'To be defined';
        } else {
            return referee || '';
        }
    };
    return {
        date: new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
        tournament: `${name}, ${round}`,
        stadium: `${venue.name ? venue.name + ',' + venue.city : ''}`,
        referee: getReferee()
    };
});
const reversePeriods = computed(() => {
    return Object.keys(displayEvents?.value)
        .reverse()
        .map((key) => {
            const events = Array.from(displayEvents.value[key]);
            events.reverse();

            return {
                period: key,
                events
            };
        });
});
</script>

<style lang="scss" scoped>
.fixtureOverview {
    margin-top: 24px;
    margin-bottom: 24px;

    &__period {
        display: grid;
        border: 1px solid #c7c7c7;
        margin-bottom: 16px;
    }
    &__periodName {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 8px 16px;
        background-color: #dadada;
        grid-column: 1/-1;
    }
}
</style>
