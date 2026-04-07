import { textOperators } from "./operators";
import type { DataTableColumnType, TextDraftValue, TextOperator } from "./types";

type FilterRegistryItem<TDraftValue> = {
    operators: TextOperator[];
    getDefaultDraftValue: () => TDraftValue;
}

const filterRegistry = {
    text: {
        operators: textOperators,
        getDefaultDraftValue: () => ({ operator: 'contains', value: '' }),
    } as FilterRegistryItem<TextDraftValue>,
}

export const getFilterRegistryItem = (type: DataTableColumnType) => {
    return filterRegistry[type];
}