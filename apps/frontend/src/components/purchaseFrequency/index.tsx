import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FunctionComponent, startTransition, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Chart, SuspenseFallback } from "./components";
import { ErrorFallback } from "@components/Customers/components";

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
                    onChange={(e) => startTransition(() => { e.target.value && setFrom(e.target.value)})}
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
                    onChange={(e) => startTransition(() => { e.target.value && setTo(e.target.value)})}
                    min={from}
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