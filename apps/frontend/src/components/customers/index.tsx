import { useCustomers } from "@apis/useCustomers";
import { Sort } from "@interfaces/sort";
import { FunctionComponent, Suspense, useState, useDeferredValue } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CustomerList: FunctionComponent<{ name: string; sort: Sort}> = ({ name, sort}) => {
    const { data } = useCustomers({
        name: name,
        sortBy: sort,
    });

    return data.map((customer) => (
        <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.count}</td>
            <td>{customer.totalAmount}</td>
        </tr>
    ));
};

export const Customers: FunctionComponent = () => {
    const [name, setName] = useState<string>("");
    const [sort, setSort] = useState<Sort>('asc');

    const queryName = useDeferredValue(name);
    const querySort = useDeferredValue(sort);

    return <>
        <div>
            <label htmlFor="customer name">이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <button onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>
            {sort === 'asc' ? '오름차순' : '내림차순'}
        </button>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>이름</td>
                    <td>총 구매 횟수</td>
                    <td>총 구매 금액</td>
                </tr>
            </thead>
            <tbody>
                <ErrorBoundary fallbackRender={() => {
                    return <tr><td colSpan={4}>fail</td></tr>;
                }}>
                    <Suspense fallback={<tr><td colSpan={4}>loading...</td></tr>}>
                        <CustomerList name={queryName} sort={querySort} />
                    </Suspense>
                </ErrorBoundary>
            </tbody>
        </table>
    </>;
};