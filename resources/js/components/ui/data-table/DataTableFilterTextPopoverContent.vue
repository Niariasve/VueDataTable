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
    import { DataTableFiltersController } from './useDataTable';
    import { textOperators } from '@/lib/data-table/operators';
    import { ref, watch } from 'vue';
    import { TextFilterValue, TextOperator } from '@/lib/data-table/types';

    interface DataTableFilterTextPopoverProps {
        filters: DataTableFiltersController<TData>;
        columnId: string;
    }

    const props = defineProps<DataTableFilterTextPopoverProps>();

    const operatorRef = ref<string>('contains');
    const search = ref<string>('');
    const isValueRequired = ref<boolean>(true);

    const handleSelectOperator = (operator: TextOperator) => {
        operatorRef.value = operator.id;
        isValueRequired.value = operator.requiresValue;
    }

    watch([search, operatorRef], ([searchValue, operatorValue]) => {
        const filterValue = {
            value: searchValue,
            operator: operatorValue,
        } as TextFilterValue;

        props.filters.setColumnFilter(props.columnId, filterValue);
    });
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-4 items-center">
            <Funnel class="size-5" />
            <Select :default-value="'contains'">
                <SelectTrigger class="flex-1">
                    <SelectValue class="capitalize" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Operators</SelectLabel>
                    <template v-for="(operator, index) in textOperators" :key="index">
                        <SelectItem :value="operator.id" class="capitalize" @select="() => handleSelectOperator(operator)">
                            {{ operator.label }}
                        </SelectItem>
                    </template>
                </SelectContent>
            </Select>
        </div>
        <div v-if="isValueRequired" class="flex flex-row gap-4 items-center">
            <Search class="size-5" />
            <Input v-model="search" />
        </div>
    </div>
</template>