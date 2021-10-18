
export default function (game, type) {
		const fixtureState = reactive({
				statusLong: game.fixture.status.long,
				statusShort: game.fixture.status.short,
				statusElapsed: game.fixture.status.elapsed,
				fixtureDate: game.fixture.date,
				fixtureTimestamp: game.fixture.timestamp,
				fixtureLiveCondition: ["1H", "2H", "HT", "ET", "PEN"]
			}); 

		const isGameLive = computed(() => fixtureState.statusLong != "Match Finished" && fixtureState.fixtureLiveCondition.includes(fixtureState.statusShort));
		const isH2H = computed(() => type == "H2H");
		const isGameFinished = computed(() => fixtureState.statusShort == "FT");
		const isGameNotStarted = computed(() => fixtureState.statusShort == "NS");
		
		const getStartMatchTime = timestamp => {
			let hours = new Date(timestamp * 1000).getHours();
			let minutes = new Date(timestamp * 1000).getMinutes();

			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;

			return hours + ":" + minutes;
		};

		const getMatchDay = date => (new Date(date).getDate() < 10 ? "0" : "") + new Date(date).getDate();

		const getMatchMonth = date => {
			let month = new Date(date).getMonth() + 1;
			return month < 10 ? "0" + month : "" + month;
		};

		const getMatchDate = (date) =>  getMatchDay(date) + "." + getMatchMonth(date)


		const fixtureStatus = {
			live: computed(() => (fixtureState.statusShort == "HT" ? fixtureState.statusShort : fixtureState.statusElapsed + "’")),
			preOrPostFixture: computed(() => (isGameNotStarted.value ? getStartMatchTime(fixtureState.fixtureTimestamp) : fixtureState.statusShort)),
			h2h: computed(() => (isGameFinished.value || isGameNotStarted.value ? getMatchDate(fixtureState.fixtureDate) : fixtureState.statusShort))
		};

		const renderFixtureStatus = computed(() => {
			if (isGameLive.value) return fixtureStatus.live.value;
			else if (isH2H.value) return fixtureStatus.h2h.value;
			else return fixtureStatus.preOrPostFixture.value;
		});

	return {
		renderFixtureStatus,
		isGameLive
	};
}
