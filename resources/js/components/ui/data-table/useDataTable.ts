import {
    ColumnDef,
    Table,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table';
import type { ColumnFiltersState } from '@tanstack/vue-table';
import { MaybeRefOrGetter, type Ref, ref, toValue } from 'vue';
import { valueUpdater } from '@/components/ui/table/utils';
import type { DraftFilter } from '@/lib/data-table/types';

export interface UseDataTableOptions<TData> {
    data: MaybeRefOrGetter<TData[]>;
    columns: MaybeRefOrGetter<ColumnDef<TData, any>[]>;
}

export interface UseDataTableReturn<TData> {
    table: Table<TData>;
    columnFilters: Ref<ColumnFiltersState>;
    draftFilters: Ref<DraftFilter[]>;
    handleAddDraftFilter: (columnId: string) => void;
    handleRemoveDraftFilter: (columnId: string) => void;
}

export function useDataTable<TData>({
    data,
    columns,
}: UseDataTableOptions<TData>): UseDataTableReturn<TData> {
    const columnFilters = ref<ColumnFiltersState>([]);
    const draftFilters = ref<DraftFilter[]>([]);

    const table = useVueTable({
        get data() {
            return toValue(data);
        },
        get columns() {
            return toValue(columns);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        state: {
            get columnFilters() {
                return columnFilters.value;
            },
        },
        onColumnFiltersChange: updaterOrValue =>
            valueUpdater(updaterOrValue, columnFilters),
    });

    const handleAddDraftFilter = (columnId: string): void => {
        const column = table.getColumn(columnId);

        if (!column) {
            return;
        }

        const label = column.columnDef.meta?.dataTable.label ?? column.id;
        const alreadyExists = draftFilters.value.some(
            filter => filter.id === columnId,
        );

        if (alreadyExists) {
            return;
        }

        draftFilters.value.push({
            id: columnId,
            label,
        });
    };

    const handleRemoveDraftFilter = (columnId: string): void => {
        draftFilters.value = draftFilters.value.filter(
            filter => filter.id !== columnId,
        );
    };

    return {
        table,
        columnFilters,
        draftFilters,
        handleAddDraftFilter,
        handleRemoveDraftFilter,
    };
}