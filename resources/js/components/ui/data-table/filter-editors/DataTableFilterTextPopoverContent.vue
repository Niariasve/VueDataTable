<script setup lang='ts' generic='TData'>
    import { Funnel, Search } from 'lucide-vue-next';
    import { computed, ref, watch } from 'vue';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'
    import { Input } from '@/components/ui/input';
    import { resolveOperators } from '@/lib/data-table/operators';
    import type { DraftFilter } from '@/lib/data-table/types';
    import { TextDraftValue, TextFilterOperator, TextOperator } from '@/lib/data-table/types';
    import { useDataTableFilters } from '../useDataTableFilters';
    import { FilterRegistryItem, getFilterRegistryItem } from '@/lib/data-table/filter-registry';

    interface DataTableFilterTextPopoverProps {
        columnId: string;
    }

    const props = defineProps<DataTableFilterTextPopoverProps>();

    const filters = useDataTableFilters<TData>();

    const draftFilter = computed(() => {
        const filter = filters.filterState.draftFilters.value.find(
            item => item.id === props.columnId,
        );

        return filter?.type === 'text' ? filter : undefined;
    });

    const search = ref<string>(
        draftFilter.value?.draftValue.value ?? '',
    );

    const isValueRequired = computed<boolean>(() =>
        operatorRef.value !== 'is_empty' &&
        operatorRef.value !== 'is_not_empty',
    );

    const column = computed(() =>
        filters.table.getColumn(props.columnId),
    );

    const meta = computed(() => {
        const dataTableMeta = column.value?.columnDef.meta?.dataTable;

        if (dataTableMeta?.type !== 'text') {
            return undefined;
        }

        return dataTableMeta;
    });

    const registryItem =
        getFilterRegistryItem('text') as FilterRegistryItem<
            TextOperator,
            TextDraftValue
        >;

    const allowedOperators = computed(() =>
        resolveOperators({
            baseOperators: registryItem.operators,
            operators: meta.value?.operators,
            excludedOperators: meta.value?.excludedOperators,
        }),
    );

    const operatorRef = ref<TextFilterOperator>(
        draftFilter.value?.draftValue.operator ?? allowedOperators.value[0].id,
    );

    watch([search, operatorRef], ([searchValue, operatorValue]) => {
        const draftValue = {
            operator: operatorValue,
            value: searchValue,
        };

        const filterValue = registryItem.toAppliedFilterValue(draftValue);

        filters.filterState.updateDraftFilter(props.columnId, draftValue);

        filters.setColumnFilter(props.columnId, filterValue);
    });
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-4 items-center">
            <Funnel class="size-5" />
            <Select v-model="operatorRef">
                <SelectTrigger class="flex-1">
                    <SelectValue class="capitalize" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Operators</SelectLabel>
                    <SelectItem v-for="(operator, index) in allowedOperators" :key="index" :value="operator.id"
                        class="capitalize">
                        {{ operator.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div v-if="isValueRequired" class="flex flex-row gap-4 items-center">
            <Search class="size-5" />
            <Input class="flex-1" v-model="search" />
        </div>
    </div>
</template>
