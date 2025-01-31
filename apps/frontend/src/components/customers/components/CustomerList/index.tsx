import { useCustomers } from "@apis/useCustomers";
import { CustomerPurchases } from "@components/CustomerPurchases";
import { Sort } from "@interfaces/sort";
import { Fragment, FunctionComponent, useDeferredValue, useState } from "react";

export const CustomerList: FunctionComponent<{ name: string; sortBy: Sort}> = ({ name, sortBy }) => {
    const { data } = useCustomers({
        name: useDeferredValue(name), 
        sortBy: "desc",
    });

    const [selected, setSelected] = useState<number | null>(null);

    if (data.length === 0) {
        return (
            <tr>
                <td colSpan={4}>
                    검색 결과가 없습니다.
                </td>
            </tr>
        );
    }

    return data.sort((a, b) => {
        if (a.totalAmount === b.totalAmount) {
            const compare = a.id - b.id;
            return sortBy === 'asc' ? compare : -compare;
        }
        return b.totalAmount - a.totalAmount;
    }).map((customer) => (
        <Fragment key={customer.id}>
            <tr onClick={() => setSelected(customer.id !== selected ? customer.id : null)}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.count}</td>
                <td>{customer.totalAmount}</td>
            </tr>
            {customer.id === selected && (
                <tr>
                    <td colSpan={4}>
                        <CustomerPurchases id={customer.id} />
                    </td>
                </tr>
            )}
        </Fragment>
    ));
};