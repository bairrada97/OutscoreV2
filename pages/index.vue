<template>
    <OrganismsCalendarBar />
    <div class="leagueContainer">
        <h2 class="leagueTypes">National Leagues</h2>

        <div @click="openGame($event, countryName)" v-for="(countryName, key) in data" :key="countryName.league.id">
            <MoleculesCardCountry :country="countryName" :name="key" :isOpen="getOpenGame(countryName) ? 'isOpen' : ''">
                <div class="align--full" v-if="getOpenGame(countryName)">
                    <div v-for="(competition, key) in countryName.league" :key="key">
                        <MoleculesCardLeague :name="key" :league="competition" />
                        <MoleculesCardGame v-for="game in competition" :key="game.fixture.id + game.fixture.status.elapsed" :game="game" />
                    </div>
                </div>
            </MoleculesCardCountry>
        </div>
    </div>
</template>

<script setup>
import store from '@/store.js';
import useCookies from '@/utils/useCookies.js';
import useGamesByDate from '@/utils/useGamesByDate.js';
import useLiveGames from '@/utils/useLiveGames';

const { getCookie, checkCookie } = useCookies();
const { fetchGamesByDate } = useGamesByDate();
const { fetchLiveGames } = useLiveGames();
const counter = ref(0);
const selectedDate = computed(() => store.getSelectedDate());
const liveToggle = computed(() => store.getLiveToggle());
const openGames = ref([]);
const interval = ref(null);
const favoriteLeaguesID = ref([2, 3, 94, 39, 140, 135, 61, 78]);

const fetch = async () => {
    return liveToggle.value ? await fetchLiveGames() : await fetchGamesByDate();
};

const { data, refresh } = await useAsyncData(`gamesByDate`, () => {
    if (getCookie('timezone') != '') checkCookie('timezone');
    return fetch();
});

const getFavoriteLeagues = computed(() => {
    if (!data.value) return;
    return Object.values(data.value)
        ?.map((country) => Object.values(country.league))
        .flat(1)
        .filter((item) => item.find((league) => favoriteLeaguesID.value.includes(league.league.id)));
});

const getOpenGame = (game) => openGames.value.find((item) => item.country == game.country);
const openGame = ({ currentTarget }, countryName) => {
    const offset = -45;
    if (openGames.value.includes(countryName)) {
        openGames.value = openGames.value.filter((game) => game.country != countryName.country);
        if (window.pageYOffset > currentTarget.getBoundingClientRect().top + window.pageYOffset + offset) {
            window.scrollTo({
                top: currentTarget.getBoundingClientRect().top + window.pageYOffset + offset
            });
        }
    } else {
        openGames.value.push(countryName);
        setTimeout(() => {
            window.scrollTo({
                top: currentTarget.getBoundingClientRect().top + window.pageYOffset + offset,
                behavior: 'smooth'
            });
        }, 5);
    }
};

const fetchOnBrowserVisibility = async () => {
    if (document.visibilityState == 'hidden') {
        clearInterval(interval.value);
    } else {
        refresh();
        interval.value = setInterval(async () => {
            refresh();
        }, 15000);
    }
};

onBeforeUnmount(() => {
    clearInterval(interval.value);
    document.removeEventListener('visibilitychange', fetchOnBrowserVisibility);
});

onMounted(() => {
    if (getCookie('timezone') == '') refresh();
    checkCookie('timezone', new Intl.DateTimeFormat().resolvedOptions().timeZone);

    document.addEventListener('visibilitychange', fetchOnBrowserVisibility);

    interval.value = setInterval(() => {
        refresh();
    }, 15000);
});

watch(
    () => [selectedDate.value, liveToggle.value],
    (newValue, prevValue) => {
        openGames.value = [];
        refresh();
    }
);

store.setSelectedMatch({});
</script>

<style lang="scss" scoped>
.leagueContainer {
    &:last-of-type {
        margin-bottom: 55px;
    }
}
.leagueTypes {
    font-size: 14px;
    font-weight: 600;
    margin-top: 16px;
    height: 40px;
    padding-left: 16px;
    display: flex;
    align-items: center;
}

.favoriteLeagues {
    border: 1px solid rgba(183, 183, 183, 0.3);
    &:not(:last-of-type) {
        margin-bottom: 8px;
    }
}

.noFavoriteLeague {
    padding-left: 16px;
}
</style>
