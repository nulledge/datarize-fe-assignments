import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FunctionComponent, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Chart, SuspenseFallback } from "./components";
import { ErrorFallback } from "@components/Customers/components";
import dayjs from "dayjs";

const isValid = (from: string, to: string): boolean => {
    return Boolean(from) 
        && Boolean(to) 
        && (dayjs(from).isBefore(to, 'date') || dayjs(from).isSame(to, 'date'))
        && (dayjs(from).isAfter('2024-07-01') || dayjs(from).isSame('2024-07-01', 'date'))
        && (dayjs(to).isBefore('2024-07-31') || dayjs(to).isSame('2024-07-31', 'date'));
};

export const PurchaseFrequency: FunctionComponent = () => {
    const [from, setFrom] = useState<string>('2024-07-01');
    const [to, setTo] = useState<string>('2024-07-31');

    return <>
        <div>
            <div>
                <label htmlFor="from">시작일</label>
                <input
                    type="date"
                    name="from"
                    required
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={from}
                    onChange={(e) => isValid(e.target.value, to) && setFrom(e.target.value)}
                    min="2024-07-01"
                    max={to}
                />
            </div>
            <div>
                <label htmlFor="to">종료일</label>
                <input
                    type="date"
                    name="to"
                    required
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={to}
                    onChange={(e) => isValid(from, e.target.value) && setTo(e.target.value)}
                    min={from}
                    max="2024-07-31"
                />
            </div>
        </div>
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
                    <Suspense fallback={<SuspenseFallback />}>
                        <Chart from={from} to={to} />
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    </>;
};