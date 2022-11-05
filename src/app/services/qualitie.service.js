import httpService from "./http.service";

const qualitieEndpoint = "quality/";

const professionService = {
    FetchAll: async () => {
        const { data } = await httpService.get(qualitieEndpoint);
        return data;
    },
};

export default professionService;
