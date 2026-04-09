import { selectOperators, textOperators } from "./operators";
import type { DataTableColumnType, SelectDraftValue, TextDraftValue, TextOperator } from "./types";

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
    select: {
        operators: selectOperators,
        getDefaultDraftValue: () => ({ operator: 'equals', value: ''}),
        toAppliedFilterValue: (draftValue: SelectDraftValue) => {
            if ('values' in draftValue) {
                return {
                    operator: draftValue.operator,
                    values: draftValue.values,
                };
            }
        
            return {
                operator: draftValue.operator,
                value: draftValue.value,
            };
        },
    }
}

export const getFilterRegistryItem = (type: DataTableColumnType) => {
    return filterRegistry[type];
}
