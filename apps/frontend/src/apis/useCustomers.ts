import { Sort } from "@interfaces/sort";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Customer } from "@interfaces/customer";
import axios, { isAxiosError } from "axios";

type Request = {
    sortBy: Sort;
    name: string;
};

type Response = Array<Customer & {
    count: number;
    totalAmount: number;
}>;

export const useCustomers = (request: Request) => {
    return useSuspenseQuery({
        queryKey: ['customer', 'list', request],
        queryFn: async ({ queryKey }) => {
            const params = new URLSearchParams(queryKey.at(-1));
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