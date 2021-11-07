<template>
    <div class="lineupsFieldGrid" v-if="team.formation">
        <div class="lineupsFieldGrid__fieldRows" v-for="(grid, index) in getGrid(team.formation)" :key="index">
            <div class="lineupsFieldGrid__fieldPlayers" :style="{ gridArea: getPlayerGridPosition(player.player.grid) }" v-for="(player, index) in getPlayersFromRow(team.startXI, grid)" :key="index">
                <AtomsLineupsFieldPlayer :number="player.player.number" :name="getPlayerName(player.player.name)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '@/store.js';
const props = defineProps({
    team: Object
});

const getGrid = (formation) => formation?.split('-').length + 1;
const getPlayerGridPosition = (grid) => {
    const row = grid.split(':')[0];
    const column = grid.split(':')[1];
    return `${row} / ${column}`;
};

const getGridColumns = (column) => `repeat(${column}, 1fr)`;
const getPlayersFromRow = (starters, index) => starters.filter((player) => player.player.grid.split(':')[0] == index);
const getPlayerName = (name) => `${name.charAt(0)}. ${name.split(' ').pop()}`;
</script>

<style lang="scss" scoped>
.lineupsFieldGrid {
    $this: &;
    display: flex;
    height: 100%;

    [data-id='0'] & {
        flex-direction: column;

        #{$this}__fieldRows {
            direction: rtl;
        }
    }

    [data-id='1'] & {
        flex-direction: column-reverse;
        #{$this}__fieldRows {
            direction: ltr;
        }
    }

    &__fieldRows {
        display: grid;
        height: 100%;
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
    }

    &__fieldPlayers {
        justify-self: center;
        grid-row: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
}
</style>
