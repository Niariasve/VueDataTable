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
    import { useDataTableFilters } from './useDataTableFilters';

    interface FilterProps {
        table: Table<TData>,
    }

    const props = defineProps<FilterProps>();
    const filters = useDataTableFilters<TData>();

    const columns = computed(() =>
        props.table.getAllColumns().filter(column =>
            Boolean(column.columnDef.meta?.dataTable),
        ),
    );

    const handleSelectFilter = (columnId: string): void => {
        if (filters.filterState.isDraftOpen(columnId)) {
            filters.filterState.removeDraftFilter(columnId);
            return;
        }

        filters.filterState.addDraftFilter(columnId);
    };
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
                        :model-value="filters.filterState.isDraftOpen(column.id)" @select="handleSelectFilter(column.id)">
                        {{ column.columnDef.meta?.dataTable.label ?? column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Tooltip>
    </TooltipProvider>
</template>