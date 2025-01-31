import { Sort } from "@interfaces/sort";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FunctionComponent, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CustomerList, ErrorFallback, SuspenseFallback } from "./components";


export const Customers: FunctionComponent = () => {
    const [name, setName] = useState<string>("");
    const [sortBy, setSortBy] = useState<Sort>('desc');

    return <>
        <div>
            <label htmlFor="customer name">이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>이름</td>
                    <td>총 구매 횟수</td>
                    <td>
                        총 구매 금액
                        <button onClick={() => setSortBy(sortBy === 'asc' ? 'desc' : 'asc')}>
                            {sortBy === 'asc' ? '⬆️' : '⬇️'}
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
                            <Suspense fallback={<SuspenseFallback />}>
                                <CustomerList name={name} sortBy={sortBy} />
                            </Suspense>
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </tbody>
        </table>
    </>;
};