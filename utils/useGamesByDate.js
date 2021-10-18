
import store from "@/store.js";
import useOutscoreRepository from "./useOutscoreRepository";

export default function () {
	const {getFixturesByDate} = useOutscoreRepository();
	const today = new Date();
	const currentMonth = today.getMonth()
	const currentYear =  today.getFullYear();

	const selectedDate = computed(() => store.getSelectedDate());
	const timezone = computed(() => store.getTimezone());

	store.setFormatDate(currentYear, currentMonth, today.getDate());

	const fetchGamesByDate = () => {
		return getFixturesByDate(selectedDate.value, timezone.value)
			.then(response => {
				store.setLiveToggle(false);
				store.setGames(response);
				return response;
			}) 
			.catch( (error) =>{} );
	
	};

	return {
		fetchGamesByDate
	};
}
