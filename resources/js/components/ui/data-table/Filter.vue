<script setup lang='ts' generic="TData">
    import { computed, ref } from 'vue';
    import { ListFilter } from 'lucide-vue-next';
    import { Column, Table } from '@tanstack/vue-table';
    import {
        DropdownMenu,
        DropdownMenuCheckboxItem,
        DropdownMenuContent,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } from '@/components/ui/tooltip'
    import { Button } from '@/components/ui/button';
    import { DataTableColumnMeta, TextFilterValue } from '@/lib/data-table/types';

    interface FilterProps {
        table: Table<TData>,
    }

    const props = defineProps<FilterProps>();

    const emit = defineEmits<{
        (e: 'add-filter', columnId: string): void,
        (e: 'remove-filter', columnId: string): void,
    }>();

    const appliedColumnFilters = ref<string[]>([]);

    const columns = computed(() =>
        props.table.getAllColumns().filter(column => {
            return Boolean(column.columnDef.meta?.dataTable)
        })
    );

    const handleSelectFilter = (columnId: string) => {
        const exists = appliedColumnFilters.value.includes(columnId);

        if (exists) {
            appliedColumnFilters.value = appliedColumnFilters.value.filter(
                (id) => id !== columnId
            );
            emit('remove-filter', columnId);
        } else {
            appliedColumnFilters.value.push(columnId);
            emit('add-filter', columnId);
        }
    };

    const filterByColumn = (columnId: string, value: string) => {
        const search: TextFilterValue = {
            value: value,
            operator: 'contains',
        }

        props.table.getColumn(columnId)?.setFilterValue(search);
    }
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <DropdownMenu>
                <TooltipTrigger as-child>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost">
                            <ListFilter class="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Filter</p>
                </TooltipContent>
                <DropdownMenuContent align="end" v-on:close-auto-focus="((e: Event) => e.preventDefault())">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuCheckboxItem v-for="column in columns" :key="column.id" class="capitalize"
                        :model-value="column.getIsFiltered()" @select="handleSelectFilter(column.id)">
                        {{ column.columnDef.meta?.dataTable.label ?? column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Tooltip>
    </TooltipProvider>
</template>