<template>
    <div class="fixtureBetsHelper">
        <OrganismsOutterWrapper>
            <!--
        <Filters title="Last 5 games">
            {{ extraInfo }}
            <CardBetsBoard v-if="getBoardInfo" :matchDetail="matchDetail" :getBoardInfo="getBoardInfo" title="Last 5 games" type="All"></CardBetsBoard>
            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('Full Time')" v-if="getSelectedFilter == 'Last 5 games'">
                <CardBetsHelper name="Full Time" :isOpen="getOpenTeamLineup('Full Time') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('Full Time')">
                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperFulltime" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLength" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('First Half')" v-if="getSelectedFilter == 'Last 5 games'">
                <CardBetsHelper name="First Half" :isOpen="getOpenTeamLineup('First Half') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('First Half')">
                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperFirstHalf" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLength" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('Second Half')" v-if="getSelectedFilter == 'Last 5 games'">
                <CardBetsHelper name="Second Half" :isOpen="getOpenTeamLineup('Second Half') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('Second Half')">
                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperSecondHalf" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLength" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
        </Filters>
        <Filters title="H2H">
            <CardBetsBoard v-if="getBoardInfoH2H" :matchDetail="matchDetail" :getBoardInfo="getBoardInfoH2H" title="H2H - Last 5 games" type="H2H"></CardBetsBoard>

            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('Full Time')" v-if="getSelectedFilter == 'H2H' && getBoardInfoH2H.gameLength > 0">
                <CardBetsHelper name="Full Time" :isOpen="getOpenTeamLineup('Full Time') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('Full Time')">

                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperH2HFulltime" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLengthH2H" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('First Half')" v-if="getSelectedFilter == 'H2H' && getBoardInfoH2H.gameLength > 0">
                <CardBetsHelper name="First Half" :isOpen="getOpenTeamLineup('First Half') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('First Half')">

                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperH2HFirstHalf" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLengthH2H" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
            <div class="matchBetsHelper__overallInfo__dropdown" @click="openTeamLineup('Second Half')" v-if="getSelectedFilter == 'H2H' && getBoardInfoH2H.gameLength > 0">
                <CardBetsHelper name="Second Half" :isOpen="getOpenTeamLineup('Second Half') ? 'isOpen' : ''">
                    <ul class="matchBetsHelper__list" v-if="getOpenTeamLineup('Second Half')">

                        <li class="matchBetsHelper__item" v-for="(category, index) in betsHelperH2HSecondHalf" :key="index">
                            <h3 class="matchBetsHelper__title">{{ index }}</h3>
                            <div class="matchBetsHelper__stats" v-for="(subCategory, index) in category" :key="index">
                                <CardStats :statistics="subCategory" :team="index" :lastGamesLength="lastGamesLengthH2H" />
                            </div>
                        </li>
                    </ul>
                </CardBetsHelper>
            </div>
        </Filters>
        <Filters title="Facts"> </Filters>
        -->
        </OrganismsOutterWrapper>
    </div>
</template>
<script setup>
import useBetsHelper from '@/utils/useBetsHelper';
const props = defineProps({
    fixtureDetail: Object
});

const { fetchFixtureBetsHelper, betsHelperFulltime, betsHelperFirstHalf, betsHelperSecondHalf, betsHelperH2HFulltime, betsHelperH2HFirstHalf, betsHelperH2HSecondHalf, getBoardInfo, getBoardInfoH2H, extraInfo, betsHelperResponse } = useBetsHelper(props.fixtureDetail);
const { home, away } = props.fixtureDetail.teams;
// const lastGamesLength = computed(() => getBoardInfo.value.gameLength);
// const lastGamesLengthH2H = computed(() => getBoardInfoH2H.value.gameLength);
// const isOpen = ref([]);
// const getSelectedFilter = computed(() => store.getSelectedFilter());

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
