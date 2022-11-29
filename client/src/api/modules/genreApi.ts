import axiosBase from "../axiosBase";

export const genreApi = {
    getGenres: async () => {
        try {
            const data = await axiosBase.get<any, any>("/genre");
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
