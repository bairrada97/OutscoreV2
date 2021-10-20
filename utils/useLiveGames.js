import store from '@/store.js';

import useOutscoreRepository from './useOutscoreRepository';

export default function () {
    const { getLiveGames } = useOutscoreRepository();

    const timezone = computed(() => store.getTimezone());

    const fetchLiveGames = () => {
        return getLiveGames(timezone.value ? timezone.value : 'Europe/Berlin')
            .then((response) => {
                return response;
            })
            .catch((error) => {});
    };

    return {
        fetchLiveGames
    };
}
