import { FunctionComponent } from "react"
import { FallbackProps } from "react-error-boundary"

export const ErrorFallback: FunctionComponent<FallbackProps> = ({ resetErrorBoundary }) => {
    return <>
        <tr>
            <td colSpan={4}>
                알 수 없는 오류가 발생했습니다.
            </td>
        </tr>
        <tr>
            <td colSpan={4}>
                <button onClick={resetErrorBoundary}>
                    재시도
                </button>
            </td>
        </tr>
    </>;
};