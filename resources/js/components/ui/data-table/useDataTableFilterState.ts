import { resolveOperators, textOperators } from '@/lib/data-table/operators';
import { DraftFilter } from '@/lib/data-table/types';
import { Table } from '@tanstack/vue-table';
import { ref, Ref } from 'vue';

export interface StateOptions<TData> {
    table: Table<TData>
}

export interface StateController {
    draftFilters: Ref<DraftFilter[]>;
    addDraftFilter: (columnId: string) => void;
    removeDraftFilter: (columnId: string) => void;
    updateDraftFilter: (columnId: string, value: any) => void;
    isDraftOpen: (columnId: string) => boolean;
}

export function useDataTableFilterState<TData>({
    table
}: StateOptions<TData>): StateController {
    const draftFilters = ref<DraftFilter[]>([]);

    const isDraftOpen = (columnId: string): boolean =>
        draftFilters.value.some(filter => filter.id === columnId)

    const addDraftFilter = (columnId: string) => {
        const column = table.getColumn(columnId);

        if (!column || isDraftOpen(columnId)) return;

        const columnDefMeta = column.columnDef.meta;
        const label = columnDefMeta?.dataTable.label ?? column.id;
        const type = columnDefMeta?.dataTable.type ?? 'text';
        const operators = resolveOperators({
            baseOperators: textOperators,
            operators: columnDefMeta?.dataTable.operators,
            excludedOperators: columnDefMeta?.dataTable.excludedOperators,
        });
        const defaultOperator = operators.length > 0 ? operators[0].id : 'contains';

        draftFilters.value.push({
            id: columnId,
            label,
            type,
            open: false,
            draftValue: {
                operator: defaultOperator,
                value: '',
            }
        });
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
        isDraftOpen,
    }
}