import type { FilterFn } from '@tanstack/vue-table';
import type { TextFilterValue } from './types';

const normalizeText = (value: unknown): string => {
    if (value == null) {
        return '';
    }

    const textValue = String(value).trim().toLowerCase();

    return textValue;
}

export const dataTableTextFilterFn: FilterFn<any> = (
    row,
    columnId,
    filterValue,
) => {
    const rawValue = row.getValue(columnId);
    const normalizedValue = normalizeText(rawValue);
    const typedFilterValue = filterValue as TextFilterValue;

    if (!('value' in typedFilterValue)) {
        return typedFilterValue.operator === 'is_empty'
            ? normalizedValue === ''
            : normalizedValue !== '';
    }

    const normalizedFilterValue = normalizeText(typedFilterValue.value);

    switch (typedFilterValue.operator) {
        case 'is':
            return normalizedFilterValue === normalizedValue;

        case 'is_not':
            return normalizedFilterValue !== normalizedValue;

        case 'contains':
            return normalizedValue.includes(normalizedFilterValue);

        case 'does_not_contain':
            return !normalizedValue.includes(normalizedFilterValue);

        case 'starts_with':
            return normalizedValue.startsWith(normalizedFilterValue);

        case 'ends_with':
            return normalizedValue.endsWith(normalizedFilterValue);

        default:
            return true;
    }
}

export const dataTableFilterFns = {
    dataTableText: dataTableTextFilterFn,
}