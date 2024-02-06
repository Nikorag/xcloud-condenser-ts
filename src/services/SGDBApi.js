const API_KEY = "112c9e0822e85e054b87793e684b231a";
const API_HOST = "www.steamgriddb.com";

import axios from 'axios';

const sgdbApiClient = axios.create({
  baseURL: `http://localhost:2075/api/${API_HOST}/api/v2`, // Replace with your API endpoint
});

export async function getGameId(gameName){
    let searchResponse = await sgdbApiClient.get(`/search/autocomplete/${gameName}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${API_KEY}`
          }
    });
    if (searchResponse.data.success){
        return searchResponse.data.data[0].id;
    }
}

async function getImage(gameId, type, args = ""){
    if (gameId){
        let sgdbResponse = await sgdbApiClient.get(`/${type}/game/${gameId}?${args}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${API_KEY}`
              }
        });
        if (sgdbResponse.data.success){
            return sgdbResponse.data.data[0].url;
        }
    }
}

export async function getHero(gameId){
    return await getImage(gameId, "heroes");
}

export async function getLogo(gameId){
    return await getImage(gameId, "logos");
}

export async function getPortrait(gameId){
    return await getImage(gameId, "grids", "dimensions=600x900");
}

export async function getLandscape(gameId){
    return await getImage(gameId, "grids", "dimensions=460x215,920x430");
}