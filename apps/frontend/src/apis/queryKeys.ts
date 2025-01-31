import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

const purchaseFrequency = createQueryKeys('purchase frequency', {
    'list': ['list'],
});

const customer = createQueryKeys('customer', {
    'list': ['list'],
    'purchases': (id: number) => ['detail', id, 'purchases'],
});

export const QUERY_KEYS = mergeQueryKeys(
    purchaseFrequency,
    customer,
);
