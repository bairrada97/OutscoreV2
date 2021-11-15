<template>
    <div class="fixtureBetsHelper">
        <MoleculesFiltersWrapper>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'Last 5 games'">
                <MoleculesCardBetsBoard v-if="getBoardInfo" :fixtureDetail="fixtureDetail" :getBoardInfo="getBoardInfo" title="Last 5 games" type="All"></MoleculesCardBetsBoard>
            </AtomsFilters>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'H2H'">
                <MoleculesCardBetsBoard v-if="getBoardInfoH2H" :fixtureDetail="fixtureDetail" :getBoardInfo="getBoardInfoH2H" title="H2H - Last 5 games" type="H2H"></MoleculesCardBetsBoard>
            </AtomsFilters>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'Facts'"><div>cenas3</div> </AtomsFilters>
        </MoleculesFiltersWrapper>
    </div>
</template>
<script setup>
import useBetsHelper from '@/utils/useBetsHelper';
import store from '@/store.js';

const props = defineProps({
    fixtureDetail: Object
});
const getSelectedBetsHelperFilter = computed(() => store.getSelectedBetsHelperFilter());

const { fetchFixtureBetsHelper, betsHelperFulltime, betsHelperFirstHalf, betsHelperSecondHalf, betsHelperH2HFulltime, betsHelperH2HFirstHalf, betsHelperH2HSecondHalf, getBoardInfo, getBoardInfoH2H, extraInfo, betsHelperResponse } = useBetsHelper(props.fixtureDetail);
const { home, away } = props.fixtureDetail.teams;
// const lastGamesLength = computed(() => getBoardInfo.value.gameLength);
// const lastGamesLengthH2H = computed(() => getBoardInfoH2H.value.gameLength);
// const isOpen = ref([]);\

const { data, refresh } = await useAsyncData(`fixtureBetsHelper`, () => {
    return fetchFixtureBetsHelper(home, away);
});

// const openTeamLineup = (name) => {
//     if (isOpen.value.includes(name)) {
//         isOpen.value = isOpen.value.filter((openedNames) => openedNames !== name);
//     } else {
//         isOpen.value.push(name);
//     }
// };

// const getOpenTeamLineup = (name) => isOpen.value.find((item) => item == name);

// watch(
//     () => getSelectedFilter.value,
//     (newValue, prevValue) => {
//         isOpen.value = [];
//     }
// );
</script>

<style lang="scss" scoped>
.fixtureBetsHelper {
    padding: 24px 16px;

    &__title {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 8px 16px;
        background-color: #dadada;
        grid-column: 1/-1;
    }

    &__item {
        display: grid;
        gap: 24px 0;
        padding-bottom: 24px;
    }

    &__stats {
        padding: 0 10px;
    }
}
</style>
