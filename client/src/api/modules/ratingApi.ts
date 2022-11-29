import axiosClient from "../axiosClient";

export const ratingApi = {
    rateMovie: async ({ _id, score }: { _id: string; score: number }) => {
        try {
            const data = await axiosClient.post<any, any>("/rating/submit", {
                _id,
                score,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserRating: async (movieId: string) => {
        try {
            const data = await axiosClient.post<any, any>("/rating", {
                _id: movieId,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
