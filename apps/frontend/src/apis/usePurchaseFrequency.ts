import { useSuspenseQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { QUERY_KEYS } from "./queryKeys";

type Request = {
    from: string;
    to: string;
};

type Response = Array<{
    range: string;
    count: number;
}>;

export const usePurchaseFrequency = ({ from, to }: Request) => {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS["purchase frequency"].list(from, to).queryKey,
        queryFn: async ({ queryKey }) => {
            const range = queryKey[3];
            const params = new URLSearchParams(range);

            return await axios.get<Response>(`api/purchase-frequency`, { params })
                .catch((error) => {
                    if (isAxiosError(error) && error.status === 404) {
                        return { data: [] };
                    }
                    throw error;
                })
                .then(({ data }) => data)
        },
    })
};