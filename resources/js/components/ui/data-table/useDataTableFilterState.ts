import type { DraftFilter, SelectDraftValue, TextDraftValue } from '@/lib/data-table/types';
import { Table } from '@tanstack/vue-table';
import { ref, Ref } from 'vue';
import { getFilterRegistryItem } from '@/lib/data-table/filter-registry';

export interface StateOptions<TData> {
    table: Table<TData>
}

export interface StateController {
    draftFilters: Ref<DraftFilter[]>;
    addDraftFilter: (columnId: string) => void;
    removeDraftFilter: (columnId: string) => void;
    updateDraftFilter: (columnId: string, value: any) => void;
    hasDraftFilter: (columnId: string) => boolean;
}

export function useDataTableFilterState<TData>({
    table
}: StateOptions<TData>): StateController {
    const draftFilters = ref<DraftFilter[]>([]);

    const hasDraftFilter = (columnId: string): boolean =>
        draftFilters.value.some(filter => filter.id === columnId)

    const addDraftFilter = (columnId: string) => {
        const column = table.getColumn(columnId);

        if (!column || hasDraftFilter(columnId)) return;

        const columnDefMeta = column.columnDef.meta;
        const label = columnDefMeta?.dataTable.label ?? column.id;
        const type = columnDefMeta?.dataTable.type ?? 'text';

        if (type === 'text') {
            const draftValue = getFilterRegistryItem(type)
                .getDefaultDraftValue() as TextDraftValue;

            draftFilters.value.push({
                id: columnId,
                label,
                type,
                draftValue,
            });

            return;
        }

        if (type === 'select' || type === 'status') {
            const draftValue = getFilterRegistryItem(type)
                .getDefaultDraftValue() as SelectDraftValue;

            draftFilters.value.push({
                id: columnId,
                label,
                type,
                draftValue,
            });
        }
    }

    const removeDraftFilter = (columnId: string): void => {
        draftFilters.value = draftFilters.value.filter(
            filter => filter.id !== columnId
        );

        table.getColumn(columnId)?.setFilterValue(undefined);
    }

    const updateDraftFilter = (
        columnId: string,
        value: DraftFilter['draftValue']
    ): void => {
        const filter = draftFilters.value.find(filter => filter.id === columnId);

        if (!filter) return;

        filter.draftValue = value;
    }

    return {
        draftFilters,
        addDraftFilter,
        removeDraftFilter,
        updateDraftFilter,
        hasDraftFilter,
    }
}
