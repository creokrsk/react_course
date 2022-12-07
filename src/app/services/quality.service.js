import httpService from "./http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    FetchAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    },
};

export default qualityService;
