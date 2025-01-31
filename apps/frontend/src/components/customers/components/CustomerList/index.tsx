import { useCustomers } from "@apis/useCustomers";
import { Sort } from "@interfaces/sort";
import { Fragment, FunctionComponent, useDeferredValue } from "react";

type Props = {
    name: string; 
    sortBy: Sort;
    onSelect: (id: number) => void;
};

export const CustomerList: FunctionComponent<Props> = ({ name, sortBy, onSelect }) => {
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
        <Fragment key={customer.id}>
            <tr onClick={() => onSelect(customer.id)}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.count}</td>
                <td>{customer.totalAmount}</td>
            </tr>
        </Fragment>
    ));
};