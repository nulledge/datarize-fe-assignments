import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError: true, // <ErrorBoundary> 사용을 위해 활성화
            retry: false, // "결과 없음"이 404 오류로 반환되므로 사용성을 위해 비활성화
        },
    },
});