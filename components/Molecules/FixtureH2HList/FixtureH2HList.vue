<template>
    <div class="fixtureH2H__container" v-if="isActive">
        <h3 class="fixtureH2H__title">{{ H2HTitles[key] }}</h3>
        <div class="fixtureH2H__fixtures">
            <MoleculesCardGame v-for="fixture in team" :key="fixture.fixture.id" :game="fixture" type="H2H" />
        </div>
    </div>
</template>

<script setup>
import store from '@/store.js';
const props = defineProps({
    fixtureDetail: Object,
    team: Object,
    key: String,
    isActive: Boolean
});

const H2HTitles = ref(['HEAD TO HEAD', `Last Fixtures: ${props.fixtureDetail.teams.home.name}`, `Last Fixtures: ${props.fixtureDetail.teams.away.name}`]);
</script>

<style lang="scss" scoped></style>
