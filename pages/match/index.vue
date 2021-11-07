<template>
    <div class="matchDetail">
        <OrganismsFixtureInfo :fixtureDetail="setFixture || data" />
        <OrganismsFixtureTabsWrapper>
            <MoleculesFixtureTab title="Overview"><OrganismsFixtureOverview v-if="getSelectedTab == 'Overview'" :fixtureDetail="data" /> </MoleculesFixtureTab>
            <MoleculesFixtureTab title="Lineups"><OrganismsFixtureLineups v-if="getSelectedTab == 'Lineups'" :fixtureDetail="data" /></MoleculesFixtureTab>
            <MoleculesFixtureTab title="Statistics"><div v-if="getSelectedTab == 'Statistics'">cenas2</div></MoleculesFixtureTab>
            <MoleculesFixtureTab title="BetsHelper"><div v-if="getSelectedTab == 'BetsHelper'">cenas3</div></MoleculesFixtureTab>
            <MoleculesFixtureTab title="H2H"><div v-if="getSelectedTab == 'H2H'">cenas4</div></MoleculesFixtureTab>
            <MoleculesFixtureTab title="Standings"><div v-if="getSelectedTab == 'Standings'">cenas5</div></MoleculesFixtureTab>
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
