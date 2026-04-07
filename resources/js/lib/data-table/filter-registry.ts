import { textOperators } from "./operators";
import type { DataTableColumnType, TextDraftValue, TextOperator } from "./types";

type FilterRegistryItem<TOperatorOption, TDraftValue> = {
    operators: TOperatorOption[];
    getDefaultDraftValue: () => TDraftValue;
}

const filterRegistry = {
    text: {
        operators: textOperators,
        getDefaultDraftValue: () => ({ operator: 'contains', value: '' }),
    } as FilterRegistryItem<TextOperator, TextDraftValue>,
}

export const getFilterRegistryItem = (type: DataTableColumnType) => {
    return filterRegistry[type];
}