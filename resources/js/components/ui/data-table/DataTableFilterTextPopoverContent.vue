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
    import { textOperators } from '@/lib/data-table/operators';
    import { computed, ref, watch } from 'vue';
    import { TextFilterOperator, TextFilterValue } from '@/lib/data-table/types';
    import { useDataTableFilters } from './useDataTableFilters';

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

    const allowedOperators = computed(() => {
        const columnMeta = column.value?.columnDef.meta;

        const configuredOperators = columnMeta?.dataTable.operators;
        const excludedOperators = columnMeta?.dataTable.excludedOperators;

        const baseOperators = configuredOperators?.length
            ? textOperators.filter(operator => 
                configuredOperators.includes(operator.id),            
            )
            : textOperators;

        return baseOperators.filter(operator => 
            !excludedOperators?.includes(operator.id)
        );
    });

    const operatorRef = ref<TextFilterOperator>(
        draftFilter.value?.draftValue.operator ?? allowedOperators.value[0].id,
    );

    watch([search, operatorRef], ([searchValue, operatorValue]) => {
        const filterValue: TextFilterValue =
            operatorValue === 'is_empty' || operatorValue === 'is_not_empty'
                ? {
                    operator: operatorValue,
                }
                : {
                    value: searchValue,
                    operator: operatorValue,
                };

        filters.filterState.updateDraftFilter(props.columnId, {
            operator: operatorValue,
            value: searchValue,
        });
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
                        <SelectItem v-for="(operator, index) in allowedOperators" :key="index"  :value="operator.id" class="capitalize">
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