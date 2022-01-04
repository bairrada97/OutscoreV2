<template>
    <div class="fixtureStandings">
        <div class="fixtureStandings__labels">
            <div>#</div>
            <div class="fixtureStandings__labels--team">Team</div>
            <span>P</span>
            <span>W</span>
            <span>D</span>
            <span>L</span>
            <div>Pts</div>
        </div>

        <div class="fixtureStandings__container">
            <MoleculesCardStandings v-for="standing in data.flat()" :key="standing.team.id" :standing="standing" :color="getColorAndDescription(standing)" />
        </div>

        <div class="fixtureStandings__colorsDescriptionContainer" v-if="addColorsToDescription">
            <div class="fixtureStandings__colorsDescription" v-for="(description, index) in addColorsToDescription" :key="index">
                <span class="fixtureStandings__colorsLabel" :style="{ background: description.color }"></span>
                <span class="fixtureStandings__subtitles">{{ description.description }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import store from '@/store.js';
import useStandings from '@/utils/useStandings';

const props = defineProps({
    fixtureDetail: Object
});

const { loadStandings } = useStandings();

const { data, refresh } = await useAsyncData(`fixtureStandings`, () => {
    return loadStandings(props.fixtureDetail, props.fixtureDetail.league.season);
});

const filterTeamDescription = computed(() => new Set(data?.value?.flat().map((item) => item.description)));

const promotionColors = ['#187C56', '#7CCC15', '#3CDBD3'];
const relegationColors = ['#D16666', '#FF8552', '#E3DBDB'];

let colorPromotionIndex = ref(0);
let colorRelegationIndex = ref(0);

const addColorsToDescription = computed(() => {
    colorPromotionIndex.value = 0;
    colorRelegationIndex.value = 0;
    return Array.from(filterTeamDescription?.value)?.reduce((acc, description, index) => {
        if (!description) return acc;
        if (description.includes('Relegation')) {
            acc.push({
                description,
                color: relegationColors[colorRelegationIndex.value]
            });
            colorRelegationIndex.value++;
        } else {
            acc.push({
                description,
                color: promotionColors[colorPromotionIndex.value]
            });
            colorPromotionIndex.value++;
        }

        return acc;
    }, []);
});

const getColorAndDescription = ({ description }) => {
    const getMatchedDescription = addColorsToDescription?.value?.find((item) => item.description == description);
    return getMatchedDescription?.color;
};
</script>

<style lang="scss" scoped>
.fixtureStandings {
    padding: 24px 16px;

    &__container {
        padding-bottom: 24px;
        box-shadow: inset 0px -1px 0px rgba(183, 183, 183, 0.3);
    }
    &__labels {
        display: grid;
        grid-template-columns: 24px 1fr 20px 20px 20px 20px 24px;
        gap: 4px;
        color: #212121;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;

        &--team {
            text-align: left;
        }
    }

    &__colorsDescriptionContainer {
        margin-top: 16px;
    }

    &__colorsDescription {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
    }

    &__colorsLabel {
        display: block;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        margin-right: 16px;
    }

    &__subtitles {
        color: #565656;
    }
}
</style>
