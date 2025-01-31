import { useCustomers } from "@apis/useCustomers";
import { Sort } from "@interfaces/sort";
import { FunctionComponent, useDeferredValue } from "react";

export const CustomerList: FunctionComponent<{ name: string; sortBy: Sort}> = ({ name, sortBy }) => {
    const { data } = useCustomers({
        name: useDeferredValue(name), 
        sortBy: useDeferredValue(sortBy),
    });

    if (data.length === 0) {
        return (
            <tr>
                <td colSpan={4}>
                    검색 결과가 없습니다.
                </td>
            </tr>
        );
    }

    return data.map((customer) => (
        <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.count}</td>
            <td>{customer.totalAmount}</td>
        </tr>
    ));
};