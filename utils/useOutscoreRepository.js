


export default function  () {
  
    const OUTSCORE_ENDPOINTS = {
       baseURL: 'https://api-football-v3.herokuapp.com/api/v3',
        fixtures: "/fixtures",
        h2h:"/fixtures/headtohead"

    }

    const getFixturesByDate = async (date, timezone)   => {
       
         return await $fetch(OUTSCORE_ENDPOINTS.fixtures,
         {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                date,
                timezone: timezone == "UTC" ? "Europe/Amsterdam" : timezone 
            }
         });
    
    
    
    }

     const getLiveGames = async (timezone) => {
          return await $fetch(OUTSCORE_ENDPOINTS.fixtures,
         {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                live: "all",
                timezone
            }
         });
 
        
    }

   
	return {
		getFixturesByDate,
        getLiveGames
     
	};
}
