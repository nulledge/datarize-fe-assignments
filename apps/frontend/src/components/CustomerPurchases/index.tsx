import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FunctionComponent, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, Purchases, SuspenseFallback } from "./components";

type Props = {
    id: number;
};

export const CustomerPurchases: FunctionComponent<Props> = ({ id }) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
                    <Suspense fallback={<SuspenseFallback />}>
                        <Purchases id={id} />
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};