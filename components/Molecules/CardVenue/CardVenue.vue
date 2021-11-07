<template>
    <div class="cardVenue">
        <div class="cardVenue__content" v-for="(item, index) in venue" :key="index">
            <div><AtomsVenueType :name="index" /><span> :</span></div>
            <AtomsVenueName :name="item" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    venue: Object
});
</script>

<style lang="scss" scoped>
.cardVenue {
    background-color: #f7f7f7;
    padding: 16px;

    &__content {
        display: grid;
        grid-template-columns: 102px 1fr;
        color: #797979;

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
}
</style>
