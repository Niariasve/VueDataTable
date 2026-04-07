import type { DataTableColumnType } from './data-table-column-type';
import type { TextFilterOperator } from './text';

export interface DataTableColumnMeta {
    dataTable: {
        label: string;
        type: DataTableColumnType;
        operators?: TextFilterOperator[];
        excludedOperators?: TextFilterOperator[];
    };
}
