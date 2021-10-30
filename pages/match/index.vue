<template>
    <div class="matchDetail">
        <OrganismsFixtureInfo :fixture="setFixture" />
    </div>
</template>
<script setup>
const { query, params } = useRoute();
const fixtureFromRouting = computed(() => JSON.parse(params.match));
const setFixture = computed(() => (fixtureFromRouting.value ? fixtureFromRouting.value : selectedMatch.value));
</script>

<style lang="scss" scoped></style>
