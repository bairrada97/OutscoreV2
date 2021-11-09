import store from '@/store.js';
import useOutscoreRepository from './useOutscoreRepository';
export default function () {
    const { getFixturesInjuries } = useOutscoreRepository();
    const fixtureInjuries = ref(null)

	const loadInjuries =  (fixtureID) => {
        return getFixturesInjuries(fixtureID)
            .then((response) => {
                fixtureInjuries.value =  response.response;
             
                return response.response;
            })
            .catch((error) => {});
	};

	return {
		fixtureInjuries,
		loadInjuries
	};
}
 