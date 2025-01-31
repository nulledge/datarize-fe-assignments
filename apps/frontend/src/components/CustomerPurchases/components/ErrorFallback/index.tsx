import { FunctionComponent } from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: FunctionComponent<FallbackProps> = ({ resetErrorBoundary }) => {
    return (
        <div>
            <div>
                알 수 없는 오류가 발생했습니다.
            </div>
            <button onClick={resetErrorBoundary}>
                재시도
            </button>
        </div>
    );
};