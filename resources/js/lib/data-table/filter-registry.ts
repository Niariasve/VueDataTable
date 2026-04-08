import { textOperators } from "./operators";
import type { DataTableColumnType, TextDraftValue, TextOperator } from "./types";

export type FilterRegistryItem<TOperatorOption, TDraftValue> = {
    operators: TOperatorOption[];
    getDefaultDraftValue: () => TDraftValue;
    toAppliedFilterValue: (draftValue: TDraftValue) => unknown;
}

const filterRegistry = {
    text: {
        operators: textOperators,
        getDefaultDraftValue: () => ({ operator: 'contains', value: '' }),
        toAppliedFilterValue: (draftValue: TextDraftValue) => (
            draftValue.operator === 'is_empty' || draftValue.operator === 'is_not_empty'
                ? {
                    operator: draftValue.operator,
                }
                : {
                    operator: draftValue.operator,
                    value: draftValue.value
                }
        )
    } as FilterRegistryItem<TextOperator, TextDraftValue>,
}

export const getFilterRegistryItem = (type: DataTableColumnType) => {
    return filterRegistry[type];
}
