import { FunctionComponent } from "react";

export const SuspenseFallback: FunctionComponent = () => {
    return (
        <tr>
            <td colSpan={4}>
                조회하는 중...
            </td>
        </tr>
    );
};