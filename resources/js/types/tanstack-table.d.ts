import '@tanstack/vue-table';
import type { DataTableColumnType } from '@/lib/data-table/types';

declare module '@tanstack/vue-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        dataTable: {
            label: string,
            type: DataTableColumnType,
        }
    }
}