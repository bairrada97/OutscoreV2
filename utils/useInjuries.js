export default function () {
 const fixtureInjuries = ref(null)
	const loadInjuries = async (fixtureID) => {
        return getFixturesInjuries(fixtureID)
            .then((response) => {
                fixtureInjuries.value = response.data.response;
                return response.data.response;
            })
            .catch((error) => {});
	};

	return {
		fixtureInjuries,
		loadInjuries
	};
}
