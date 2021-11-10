export default function () {
    const OUTSCORE_ENDPOINTS = {
        baseURL: 'https://api-football-v3.herokuapp.com/api/v3',
        fixtures: '/fixtures',
        h2h: '/fixtures/headtohead',
        injuries: '/injuries',
        betsHelper: '/betshelper'
    };

    const getFixturesByDate = async (date, timezone) => {
        return await $fetch(OUTSCORE_ENDPOINTS.fixtures, {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                date,
                timezone: timezone == 'UTC' ? 'Europe/Amsterdam' : timezone
            }
        });
    };

    const getLiveGames = async (timezone) => {
        return await $fetch(OUTSCORE_ENDPOINTS.fixtures, {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                live: 'all',
                timezone
            }
        });
    };

    const getFixturesById = async (id, timezone) => {
        return await $fetch(OUTSCORE_ENDPOINTS.fixtures, {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                id,
                timezone
            }
        });
    };

    const getFixturesInjuries = async (fixtureID) => {
        return await $fetch(OUTSCORE_ENDPOINTS.injuries, {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                fixture: fixtureID
            }
        });
    };

    const getFixturesBetsHelper = async (homeID, awayID) => {
        return await $fetch(OUTSCORE_ENDPOINTS.betsHelper, {
            baseURL: OUTSCORE_ENDPOINTS.baseURL,
            params: {
                home: homeID,
                away: awayID
            }
        });
    };

    return {
        getFixturesByDate,
        getLiveGames,
        getFixturesById,
        getFixturesInjuries,
        getFixturesBetsHelper
    };
}
