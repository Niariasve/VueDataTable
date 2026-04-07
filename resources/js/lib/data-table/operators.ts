import type { TextOperator } from "./types";

export const textOperators: TextOperator[] = [
    { id: 'contains', label: 'contains', requiresValue: true },
    { id: 'does_not_contain', label: 'does not contain', requiresValue: true },
    { id: 'starts_with', label: 'starts with', requiresValue: true },
    { id: 'ends_with', label: 'ends with', requiresValue: true },
    { id: 'is', label: 'is', requiresValue: true },
    { id: 'is_not', label: 'is not', requiresValue: true },
    { id: 'is_empty', label: 'is empty', requiresValue: false },
    { id: 'is_not_empty', label: 'is not empty', requiresValue: false },
];