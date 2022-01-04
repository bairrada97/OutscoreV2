import store from '@/store.js';
import useOutscoreRepository from './useOutscoreRepository';

export default function () {
    const standings = ref(null);
    const { getStandings } = useOutscoreRepository();

    const loadStandings = (selectedMatch, seasonId) => {
        try {
            return getStandings(selectedMatch.league.id, seasonId).then((response) => {
                const { away, home } = selectedMatch.teams;
                standings.value = response.response[0].league.standings;

                if (standings.value.length <= 1) {
                    standings.value = response.response[0].league.standings.shift();
                    store.setStandings(standings.value);
                } else {
                    const getGroup = standings.value?.filter((group) => group.find((item) => item.team.id == away.id || item.team.id == home.id));
                    store.setStandings(getGroup);
                }

                return standings.value;
            });
        } catch (error) {
            store.setStandings({});
        }
    };

    return {
        standings,
        loadStandings
    };
}
