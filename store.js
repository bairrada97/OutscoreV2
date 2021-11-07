

const state = reactive({
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	liveToggle: false,
	liveGames: {},
	selectedGameStatistics: {},
	selectedMatch: {
		match: {},
		awayTeamH2H: [],
		homeTeamH2H: [],
		h2h: [],
		standings: []
	},
	games: {},
	selectedDate: {
		raw: null,
		formated: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0]
	},
	isCalendarOpen: false,
	selectedTab: "",
	selectedFilter: "",
	betsHelper: {
		away: {},
		home: {},
		h2h: {}
	},
	fixtureTabs:["Overview", "Lineups", "Statistics", "BetsHelper","H2H", "Standings"]
});  
  
//SetCalendar
const setCalendarOpen = response => (state.isCalendarOpen = response);
const setFormatDate = (year, month, day) => {
	const date = new Date(year, month, day);
	state.selectedDate.raw = date;

	const offset = date.getTimezoneOffset();
	let newDate = new Date(date.getTime() - offset * 60 * 1000);
	state.selectedDate.formated = newDate.toISOString().split("T")[0];
};
const setNoDate = () => {
	state.selectedDate.raw = null;
	state.selectedDate.formated = null;
};

const getFixtureTabs = () => state.fixtureTabs;

//GetCalendar
const getCalendarOpen = () => state.isCalendarOpen;
const getSelectedDate = () => state.selectedDate.formated;
const getRawSelectedDate = () => state.selectedDate.raw;

//SetGlobal
const setLiveGames = response => (state.liveGames = response);
const setGames = response => (state.games = response);
const setSelectedMatch = response => (state.selectedMatch.match = response);
const setSelectedTab = response => (state.selectedTab = response);
const setSelectedFilter = response => (state.selectedFilter = response);
const setLiveToggle = response => (state.liveToggle = response);

//GetGlobal
const getSelectedTab = () => state.selectedTab;
const getSelectedFilter = () => state.selectedFilter;
const getTimezone = () => state.timezone;
const getLiveGames = () => state.liveGames;
const getGames = () => state.games;
const getLiveToggle = () => state.liveToggle;

//SetMatch
const setH2H = response => (state.selectedMatch.h2h = response);
const setAwayTeamH2H = response => (state.selectedMatch.awayTeamH2H = response);
const setHomeTeamH2H = response => (state.selectedMatch.homeTeamH2H = response);
const setGameStatistics = response => (state.selectedGameStatistics = response);
const setBetsHelper = response => (state.betsHelper = response);
const setStandings = response => (state.selectedMatch.standings = response);
const setTeamsFromStandings = response => (state.selectedMatch.teams = response);

//GetMatch
const getH2H = () => state.selectedMatch.h2h;
const getAwayTeamH2H = () => state.selectedMatch.awayTeamH2H;
const getHomeTeamH2H = () => state.selectedMatch.homeTeamH2H;
const getBetsHelper = () => state.betsHelper;
const getStandings = () => state.selectedMatch.standings;
const getTeamsFromStandings = () => state.selectedMatch.teams;
const getGameStatistics = () => state.selectedGameStatistics;
const getSelectedMatch = () => state.selectedMatch.match;
const getSpecificGame = payload => state.games.response?.find(game => game.fixture.id == payload);

export default {
	state,
	getTimezone,
	setLiveGames,
	getLiveGames,
	setGames,
	getGames,
	getSelectedMatch,
	setGameStatistics,
	getGameStatistics,
	getSpecificGame,
	setSelectedMatch,
	setFormatDate,
	setNoDate,
	getSelectedDate,
	getRawSelectedDate,
	setLiveToggle,
	getLiveToggle,
	setCalendarOpen,
	getCalendarOpen,
	getAwayTeamH2H,
	getHomeTeamH2H,
	getH2H,
	setAwayTeamH2H,
	setHomeTeamH2H,
	setH2H,
	setSelectedTab,
	getSelectedTab,
	getStandings,
	setStandings,
	setSelectedFilter,
	getSelectedFilter,
	getBetsHelper,
	setBetsHelper,
	setTeamsFromStandings,
	getTeamsFromStandings,
	getFixtureTabs
};
