
import store from "@/store.js";
import useOutscoreRepository from './useOutscoreRepository';



export default function () {

	const {getFixturesByTeam, getH2H} = useOutscoreRepository();


    const loadH2H = async teams => {
     
        try {
            const { away, home } = teams;
            const promiseArray = [ getH2H(home.id, away.id),getFixturesByTeam(home.id),getFixturesByTeam(away.id)] 
          
           return  Promise.all(promiseArray)
                .then(responses => {
                    const gameFinished = ["FT","AET","PEN"]

                    store.setAwayTeamH2H(responses[0].response.filter(item => gameFinished.includes(item.fixture.status.short)));
                    store.setHomeTeamH2H(responses[1].response.filter(item => gameFinished.includes(item.fixture.status.short)));
                    store.setH2H(responses[2].response.filter(item => gameFinished.includes(item.fixture.status.short)));

                    return [responses[0].response, responses[1].response, responses[2].response]
                })
   
        } catch (error) {}
    };

    return {
        loadH2H,
       
    };
}
