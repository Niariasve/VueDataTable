<script setup lang='ts' generic="TData">
    import { computed } from 'vue';
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
    }>();

    // const columns = computed(() => props.table.getAllColumns().filter((columns) => columns.getCanFilter()));

    const emitAddFilter = (columnId: string) => {
        filterByColumn(props.table.getColumn(columnId)!, 'br');
        emit('add-filter', columnId);
    }

    const columns = computed(() =>
        props.table.getAllColumns().filter(column => {
            return Boolean(column.columnDef.meta?.dataTable)
        })
    );

    const filterByColumn = (column: Column<TData>, value: string) => {
        const search: TextFilterValue = {
            value: value,
            operator: 'contains',
        }

        props.table.getColumn(column.id)?.setFilterValue(search);
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
                        :model-value="column.getIsFiltered()" @select="emitAddFilter(column.id)">
                        {{ column.columnDef.meta?.dataTable.label ?? column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Tooltip>
    </TooltipProvider>
</template>