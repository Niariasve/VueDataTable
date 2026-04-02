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

export interface DataTableFiltersController<TData> {
    table: Table<TData>;
    columnFilters: Ref<ColumnFiltersState>;
    draftFilters: Ref<DraftFilter[]>;
    addDraftFilter: (columnId: string) => void;
    removeDraftFilter: (columnId: string) => void;
    setColumnFilter: (columnId: string, value: any) => void;
    clearColumnFilter: (columnId: string) => void;
    isDraftOpen: (columnId: string) => boolean;
    isColumnFiltered: (columnId: string) => boolean;
}

export function useDataTable<TData>({
    data,
    columns,
}: UseDataTableOptions<TData>): DataTableFiltersController<TData> {
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

    const isDraftOpen = (columnId: string): boolean =>
        draftFilters.value.some(filter => filter.id === columnId)

    const isColumnFiltered = (columnId: string): boolean =>
        columnFilters.value.some(filter => filter.id === columnId)

    const addDraftFilter = (columnId: string): void => {
        const column = table.getColumn(columnId);

        if (!column || isDraftOpen(columnId)) return;

        const columnDefMeta = column.columnDef.meta;
        const label = columnDefMeta?.dataTable?.label ?? column.id;
        const type = columnDefMeta?.dataTable.type ?? 'text';

        draftFilters.value.push({
            id: columnId,
            label,
            type,
        });
    }

    const removeDraftFilter = (columnId: string): void => {
        draftFilters.value = draftFilters.value.filter(
            filter => filter.id !== columnId
        );
    }

    const setColumnFilter = (
        columnId: string,
        value: any
    ): void => {
        table.getColumn(columnId)?.setFilterValue(value);
    }

    const clearColumnFilter = (columnId: string): void => {
        table.getColumn(columnId)?.setFilterValue(undefined);
    }

    return {
        table,
        columnFilters,
        draftFilters,
        addDraftFilter,
        removeDraftFilter,
        setColumnFilter,
        clearColumnFilter,
        isDraftOpen,
        isColumnFiltered,
    };
}