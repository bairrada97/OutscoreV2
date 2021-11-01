
import store from "@/store.js";
import useOutscoreRepository from './useOutscoreRepository';


export default function () {
    const { getFixturesById } = useOutscoreRepository();

    const timezone = computed(() => store.getTimezone())
  const fetchFixtureById = (id) => {
  
        return getFixturesById(id, timezone.value ? timezone.value : 'Europe/Berlin')
            .then((response) => {
                return response.response[0];
            })
            .catch((error) => {});
    };
  
    return {
        fetchFixtureById,
    };
}
 