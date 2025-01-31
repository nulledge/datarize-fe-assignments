import { Sort } from "@interfaces/sort";
import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

const purchaseFrequency = createQueryKeys('purchase frequency', {
    'list': (from: string, to: string) => ['list', { from, to }],
});

const customer = createQueryKeys('customer', {
    'list': (name: string, sortBy: Sort) => ['list', { name, sortBy }],
    'purchases': (id: number) => ['detail', id, 'purchases'],
});

export const QUERY_KEYS = mergeQueryKeys(
    purchaseFrequency,
    customer,
);
