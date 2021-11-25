<template>
    <div class="fixtureBetsHelper">
        <MoleculesFiltersWrapper>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'Last 5 games'">
                <MoleculesCardBetsBoard v-if="getBoardInfo" :fixtureDetail="fixtureDetail" :getBoardInfo="getBoardInfo" title="Last 5 games" type="All"></MoleculesCardBetsBoard>
                <MoleculesDropdown v-for="stats in betsHelperStats" :key="stats.name" @click="openStateOfTheGame(stats.name)">
                    <MoleculesCardBetsHelper :name="stats.name">
                        <ul class="fixtureBetsHelper__list" v-if="getOpenStateOfTheGame(stats.name)">
                            <MoleculesBetsHelperCategory v-for="(category, index) in stats.value" :key="index" :name="index" :category="category" :lastGamesLength="lastGamesLength" />
                        </ul>
                    </MoleculesCardBetsHelper>
                </MoleculesDropdown>
            </AtomsFilters>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'H2H'">
                <MoleculesCardBetsBoard v-if="getBoardInfoH2H" :fixtureDetail="fixtureDetail" :getBoardInfo="getBoardInfoH2H" title="H2H - Last 5 games" type="H2H"> </MoleculesCardBetsBoard>
                <MoleculesDropdown v-for="stats in betsHelperH2HStats" :key="stats.name" @click="openStateOfTheGame(stats.name)">
                    <MoleculesCardBetsHelper :name="stats.name">
                        <ul class="fixtureBetsHelper__list" v-if="getOpenStateOfTheGame(stats.name)">
                            <MoleculesBetsHelperCategory v-for="(category, index) in stats.value" :key="index" :name="index" :category="category" :lastGamesLength="lastGamesLengthH2H" />
                        </ul>
                    </MoleculesCardBetsHelper>
                </MoleculesDropdown>
            </AtomsFilters>
            <AtomsFilters v-if="getSelectedBetsHelperFilter == 'Facts'"><div>cenas3</div> </AtomsFilters>
        </MoleculesFiltersWrapper>
    </div>
</template>
<script setup>
import useBetsHelper from '@/utils/useBetsHelper';
import store from '@/store.js';
const isOpen = ref([]);

const props = defineProps({
    fixtureDetail: Object
});
const stateOfTheGame = ref(['Full Time', 'First Half', 'Second Half']);
const getSelectedBetsHelperFilter = computed(() => store.getSelectedBetsHelperFilter());

const { fetchFixtureBetsHelper, betsHelperStats, betsHelperH2HStats, getBoardInfo, getBoardInfoH2H, extraInfo, betsHelperResponse } = useBetsHelper(props.fixtureDetail);
const { home, away } = props.fixtureDetail.teams;
const lastGamesLength = computed(() => getBoardInfo.value.gameLength);
const lastGamesLengthH2H = computed(() => getBoardInfoH2H.value.gameLength);

const { data, refresh } = await useAsyncData(`fixtureBetsHelper`, () => {
    return fetchFixtureBetsHelper(home, away);
});

const openStateOfTheGame = (name) => {
    if (isOpen.value.includes(name)) {
        isOpen.value = isOpen.value.filter((openedNames) => openedNames !== name);
    } else {
        isOpen.value.push(name);
    }
};

const getOpenStateOfTheGame = (name) => isOpen.value.find((item) => item == name);

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
}
</style>
