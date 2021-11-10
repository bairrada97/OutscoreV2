<template>
    <div class="fixtureStatistics">
        <ul class="fixtureStatistics__list">
            <li v-for="(teams, index) in displayStatistics" :key="index">
                <MoleculesCardStats :statistics="teams" :team="index" />
            </li>
        </ul>
    </div>
</template>
<script setup>
import useObjectHelper from '@/utils/useObjectHelper.js';

const props = defineProps({
    fixtureDetail: Object
});

const displayStatistics = computed(() => {
    return props.fixtureDetail.statistics?.reduce((acc, stats) => {
        stats.statistics.forEach((stat) => {
            acc[stat.type] = acc[stat.type] || {};
            acc[stat.type].home = acc[stat.type].home || {};
            acc[stat.type].away = acc[stat.type].away || {};
            acc[stat.type].home.name = props.fixtureDetail.teams.home.name;
            acc[stat.type].away.name = props.fixtureDetail.teams.away.name;
            if (acc[stat.type].home.name == stats.team.name) acc[stat.type].home.value = stat.value;
            if (acc[stat.type].away.name == stats.team.name) acc[stat.type].away.value = stat.value;
        });

        return acc;
    }, {});
});
</script>

<style lang="scss" scoped>
.fixtureStatistics {
    padding: 24px 16px;

    &__list {
        display: grid;
        gap: 24px 0;
    }
}
</style>
