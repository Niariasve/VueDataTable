<script setup lang='ts' generic='TData'>
    import { CheckSquare, ListFilter } from 'lucide-vue-next';
    import { computed, ref, watch } from 'vue';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select';
    import { resolveOperators } from '@/lib/data-table/operators';
    import type {
        DraftFilter,
        SelectDraftValue,
        SelectOperator,
    } from '@/lib/data-table/types';
    import {
        type FilterRegistryItem,
        getFilterRegistryItem,
    } from '@/lib/data-table/filter-registry';
    import { useDataTableFilters } from '../useDataTableFilters';

    interface DataTableFilterSelectPopoverProps {
        columnId: string;
    }

    const props = defineProps<DataTableFilterSelectPopoverProps>();

    const filters = useDataTableFilters<TData>();

    const draftFilter = computed(() => {
        const filter = filters.filterState.draftFilters.value.find(
            item => item.id === props.columnId,
        );

        return filter?.type === 'select' || filter?.type === 'status'
            ? filter
            : undefined;
    });

    const column = computed(() => filters.table.getColumn(props.columnId));

    const meta = computed(() => {
        const dataTableMeta = column.value?.columnDef.meta?.dataTable;

        if (
            dataTableMeta?.type !== 'select' &&
            dataTableMeta?.type !== 'status'
        ) {
            return undefined;
        }

        return dataTableMeta;
    });

    const registryItem =
        getFilterRegistryItem('select') as FilterRegistryItem<
            SelectOperator,
            SelectDraftValue
        >;

    const allowedOperators = computed(() =>
        resolveOperators({
            baseOperators: registryItem.operators,
            operators: meta.value?.operators,
            excludedOperators: meta.value?.excludedOperators,
        }),
    );

    const options = computed(() => meta.value?.options ?? []);

    const operatorRef = ref<SelectOperator['id']>(
        draftFilter.value?.draftValue.operator ?? allowedOperators.value[0].id,
    );

    const selectedValue = ref(
        draftFilter.value?.draftValue && 'value' in draftFilter.value.draftValue
            ? draftFilter.value.draftValue.value
            : '',
    );

    const selectedValues = ref(
        draftFilter.value?.draftValue && 'values' in draftFilter.value.draftValue
            ? draftFilter.value.draftValue.values
            : [],
    );

    const isMultiSelect = computed(
        () =>
            operatorRef.value === 'is_in' || operatorRef.value === 'is_not_in',
    );

    watch(operatorRef, nextOperator => {
        if (nextOperator === 'is_in' || nextOperator === 'is_not_in') {
            selectedValues.value = selectedValue.value ? [selectedValue.value] : [];
            return;
        }

        selectedValue.value = selectedValues.value[0] ?? '';
    });

    watch([operatorRef, selectedValue, selectedValues], () => {
        const draftValue: SelectDraftValue = isMultiSelect.value
            ? {
                  operator:
                      operatorRef.value === 'is_in' ? 'is_in' : 'is_not_in',
                  values: selectedValues.value,
              }
            : {
                  operator:
                      operatorRef.value === 'equals'
                          ? 'equals'
                          : 'not_equals',
                  value: selectedValue.value,
              };

        const filterValue = registryItem.toAppliedFilterValue(draftValue);

        filters.filterState.updateDraftFilter(props.columnId, draftValue);
        filters.setColumnFilter(props.columnId, filterValue);
    });

</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex flex-row items-center gap-4">
            <ListFilter class="size-5" />
            <Select v-model="operatorRef">
                <SelectTrigger class="flex-1">
                    <SelectValue class="capitalize" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Operators</SelectLabel>
                    <SelectItem
                        v-for="(operator, index) in allowedOperators"
                        :key="index"
                        :value="operator.id"
                        class="capitalize"
                    >
                        {{ operator.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div v-if="isMultiSelect" class="flex flex-row items-center gap-4">
            <CheckSquare class="size-5" />
            <Select v-model="selectedValues" multiple>
                <SelectTrigger class="flex-1">
                    <SelectValue placeholder="Select one or more" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div v-else class="flex flex-row items-center gap-4">
            <CheckSquare class="size-5" />
            <Select v-model="selectedValue">
                <SelectTrigger class="flex-1">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
