import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "./queryKeys";

type Request = {
    id: number;
};

type Response = Array<{
    date: string;
    quantity: number;
    product: string;
    price: number;
    imgSrc: string;
}>;

export const useCustomerPurchases = ({ id }: Request) => {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS.customer.purchases(id).queryKey,
        queryFn: async ({ queryKey }) => {
            const customer = queryKey[3];
            
            return await axios.get<Response>(`api/customers/${customer}/purchases`,)
                .then(({ data }) => data)
        },
    })
};