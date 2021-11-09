<template>
    <div class="cardTeamLineup">
        <div class="cardTeamLineup__container">
            <AtomsLogo v-if="team.team.logo" :logo="team.team.logo" :name="team.team.name" />
            <AtomsLogoName :name="team.team.name" />
            <AtomsDropdownIcon />
        </div>

        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    team: Object
});
</script>

<style lang="scss" scoped>
.cardTeamLineup {
    $this: &;
    grid-column: 1/-1;

    &__container {
        display: grid;
        grid-template-columns: 40px 1fr auto auto;
        gap: 0 16px;
        padding: 8px 16px;
        align-items: center;
    }

    .isOpen & {
        #{$this}__container {
            background: var(--color-bg--black);
        }
        #{$this}__dropdown {
            color: #fff;
            transform: rotateX(180deg);
            box-sizing: content-box;
        }
    }

    &__logo {
        box-sizing: content-box;
    }

    &__name {
        font-size: 16px;
        font-weight: 600;
    }

    &__dropdown {
        grid-column: -1;
        transition: transform 0.3s ease;
        padding-left: 0;
        box-sizing: content-box;
    }
}
</style>
