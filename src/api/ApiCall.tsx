const axios = require("axios").default;

export const fetchSteamGameApi = (search: string) => {
    return axios.get("https://localhost:7217/api/FindGame?gamename="+search)
    .then((response) => {
        return response.data;
    })
}