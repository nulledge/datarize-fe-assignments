import { useCustomerPurchases } from "@apis/useCustomerPurchases";
import { FunctionComponent } from "react";

type Props = {
    id: number;
};

export const Purchases: FunctionComponent<Props> = ({ id }) => {
    const { data } = useCustomerPurchases({ id });

    return (
        <table>
            <thead>
                <tr>
                    <td>구매 날짜</td>
                    <td>구매 제품</td>
                    <td>제품 가격</td>
                    <td>제품 사진</td>
                </tr>
            </thead>
            <tbody>
                {data.map((purchase) => (
                    <tr key={`${purchase.date} ${purchase.product}`}>
                        <td>{purchase.date}</td>
                        <td>{purchase.product}</td>
                        <td>{purchase.price}</td>
                        <td>
                            <img src={purchase.imgSrc} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};