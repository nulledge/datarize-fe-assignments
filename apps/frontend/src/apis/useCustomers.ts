import { Sort } from "@interfaces/sort";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Customer } from "@interfaces/customer";
import axios, { isAxiosError } from "axios";
import { QUERY_KEYS } from "./queryKeys";

type Request = {
    name: string;
    sortBy: Sort;
};

type Response = Array<Customer & {
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
                    if (isAxiosError(error) && error.status === 404) {
                        return { data: [] };
                    }
                    throw error;
                })
                .then(({ data }) => data)
        },
    })
};