import { usePurchaseFrequency } from "@apis/usePurchaseFrequency";
import { FunctionComponent, useDeferredValue } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export const Chart: FunctionComponent<{ from: string; to: string; }> = ({ from, to }) => {
    const { data } = usePurchaseFrequency({
        from: useDeferredValue(from),
        to: useDeferredValue(to),
    });

    return (
        <BarChart
            width={500}
            height={500}
            data={data}
        >
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count"/>
        </BarChart>
    );
};