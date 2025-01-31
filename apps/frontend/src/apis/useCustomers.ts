import { Sort } from "@interfaces/sort";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { QUERY_KEYS } from "./queryKeys";

type Request = {
    name: string;
    sortBy: Sort;
};

type Response = Array<{
    id: number;
    name: string;
    count: number;
    totalAmount: number;
}>;

export const useCustomers = ({ name, sortBy}: Request) => {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS.customer.list(name, sortBy).queryKey,
        queryFn: async ({ queryKey }) => {
            const search = queryKey[3];
            const params = new URLSearchParams(search);
            
            return await axios.get<Response>(`api/customers`, { params })
                .catch((error) => {
                    // 결과값 없음이 404 오류로 반환돼서 내부적으로 처리
                    if (isAxiosError(error) && error.status === 404) {
                        return { data: [] };
                    }
                    throw error;
                })
                .then(({ data }) => data)
        },
    })
};