export type TextFilterOperator =
    | 'is'
    | 'is_not'
    | 'contains'
    | 'does_not_contain'
    | 'starts_with'
    | 'ends_with'
    | 'is_empty'
    | 'is_not_empty'

export type TextFilterValue =
    | {
        operator: 'is_empty' | 'is_not_empty';
    }
    | {
        operator:
        | 'is'
        | 'is_not'
        | 'contains'
        | 'does_not_contain'
        | 'starts_with'
        | 'ends_with';
        value: string;
    }

export type TextOperator = {
    id: TextFilterOperator,
    label: string,
    requiresValue: boolean,
}

export type DataTableColumnType = 'text';

export interface DataTableColumnMeta {
    dataTable: {
        label: string,
        type: DataTableColumnType,
        operators?: TextFilterOperator[],
    }
}