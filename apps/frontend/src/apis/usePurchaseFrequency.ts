import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "./queryKeys";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc);

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
            const params = new URLSearchParams({
                ...(range.from && { from: dayjs.utc(range.from).startOf('day').toISOString() }),
                ...(range.to && { to: dayjs.utc(range.to).endOf('day').toISOString() }),
            });

            return await axios.get<Response>(`api/purchase-frequency`, { params })
                .then(({ data }) => data)
        },
    })
};