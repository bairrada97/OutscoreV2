<template>
    <div class="matchDetail">
        <LazyOrganismsFixtureInfo :fixtureDetail="setFixture || data" />
        <OrganismsFixtureTabsWrapper>
            <MoleculesFixtureTab v-if="getSelectedTab == 'Overview'"><LazyOrganismsFixtureOverview :fixtureDetail="data" /> </MoleculesFixtureTab>
            <MoleculesFixtureTab v-if="getSelectedTab == 'Lineups'"><LazyOrganismsFixtureLineups :fixtureDetail="data" /></MoleculesFixtureTab>
            <MoleculesFixtureTab v-if="getSelectedTab == 'Statistics'"><LazyOrganismsFixtureStatistics :fixtureDetail="data" /></MoleculesFixtureTab>
            <MoleculesFixtureTab v-if="getSelectedTab == 'BetsHelper'"><LazyOrganismsFixtureBetsHelper :fixtureDetail="data" /></MoleculesFixtureTab>
            <MoleculesFixtureTab v-if="getSelectedTab == 'H2H'"><div>cenas4</div></MoleculesFixtureTab>
            <MoleculesFixtureTab v-if="getSelectedTab == 'Standings'"><div>cenas5</div></MoleculesFixtureTab>
        </OrganismsFixtureTabsWrapper>
    </div>
</template>
<script setup>
import store from '@/store.js';
import useFixturesById from '@/utils/useFixturesById';

const { query, params } = useRoute();
const { fetchFixtureById } = useFixturesById();
const getSelectedTab = computed(() => store.getSelectedTab());

const fixtureFromRouting = computed(() => (Object.keys(params).length ? JSON.parse(params.match) : null));
const interval = ref(null);

const setFixture = computed(() => fixtureFromRouting.value);

const { data, refresh } = await useAsyncData(`fixturesById`, () => {
    return fetchFixtureById(parseInt(query.fixture));
});

const fetchOnBrowserVisibility = async () => {
    if (document.visibilityState == 'hidden') {
        clearInterval(interval.value);
    } else {
        clearInterval(interval.value);
        refresh();

        interval.value = setInterval(() => {
            refresh();
        }, 15000);
    }
};

onBeforeUnmount(() => {
    clearInterval(interval.value);
    document.removeEventListener('visibilitychange', fetchOnBrowserVisibility);
});

onMounted(() => {
    document.addEventListener('visibilitychange', fetchOnBrowserVisibility);
    if (!fixtureFromRouting.value) {
        refresh();
    }

    interval.value = setInterval(() => {
        refresh();
    }, 15000);
});
</script>

<style lang="scss" scoped></style>
