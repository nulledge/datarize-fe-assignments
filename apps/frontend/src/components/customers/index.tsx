import { Sort } from "@interfaces/sort";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FunctionComponent, Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CustomerList, ErrorFallback, SuspenseFallback } from "./components";
import { debounce } from "lodash";


export const Customers: FunctionComponent = () => {
    const [name, setName] = useState<string>("");
    const [sortBy, setSortBy] = useState<Sort>('desc');

    // 네트워크 요청을 최소화하기 위한 디바운스
    const [debouncedName, setDebouncedName] = useState(name);
    const debouncedSetName = useMemo(() => debounce((value: string) => setDebouncedName(value), 300), []);

    return <>
        <div>
            <label htmlFor="customer name">이름</label>
            <input type="text" value={name} onChange={(e) => (setName(e.target.value), debouncedSetName(e.target.value))}/>
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
                                <CustomerList name={debouncedName} sortBy={sortBy} />
                            </Suspense>
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </tbody>
        </table>
    </>;
};