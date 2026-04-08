<script setup lang='ts' generic='TData'>
    import { Funnel, Search } from 'lucide-vue-next';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'
    import { Input } from '../input';
    import { resolveOperators } from '@/lib/data-table/operators';
    import { computed, ref, watch } from 'vue';
    import { TextDraftValue, TextFilterOperator, TextOperator } from '@/lib/data-table/types';
    import { useDataTableFilters } from './useDataTableFilters';
    import { FilterRegistryItem, getFilterRegistryItem } from '@/lib/data-table/filter-registry';

    interface DataTableFilterTextPopoverProps {
        columnId: string;
    }

    const props = defineProps<DataTableFilterTextPopoverProps>();

    const filters = useDataTableFilters<TData>();

    const draftFilter = computed(() =>
        filters.filterState.draftFilters.value.find(
            filter => filter.id === props.columnId
        ),
    );


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

    const meta = computed(() =>
        column.value?.columnDef.meta,
    )

    const registryItem = computed<FilterRegistryItem<TextOperator, TextDraftValue>>(() => 
        getFilterRegistryItem(meta.value?.dataTable.type ?? 'text')
    );

    const allowedOperators = computed(() =>
        resolveOperators({
            baseOperators: registryItem.value.operators,
            operators: meta.value?.dataTable.operators,
            excludedOperators: meta.value?.dataTable.excludedOperators,
        })
    )

    const operatorRef = ref<TextFilterOperator>(
        draftFilter.value?.draftValue.operator ?? allowedOperators.value[0].id,
    );

    watch([search, operatorRef], ([searchValue, operatorValue]) => {
        const draftValue = {
            operator: operatorValue,
            value: searchValue,
        };

        const filterValue = registryItem.value.toAppliedFilterValue(draftValue);

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