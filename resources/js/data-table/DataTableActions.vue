<script setup lang='ts' generic="TData">
    import { Button } from '@/components/ui/button';
    import { ButtonGroup } from '@/components/ui/button-group'
    import DataTableColumnToggle from '@/data-table/DataTableColumnToggle.vue';
    import DataTableFilterPicker from '@/data-table/DataTableFilterPicker.vue';
    import DataTableSearch from '@/data-table/DataTableSearch.vue';
    import type { DataTablePrimaryAction } from '@/data-table/primary-action';
    import { Table } from '@tanstack/vue-table';
    import { ChevronsUpDown } from 'lucide-vue-next';

    interface DataTableActionsProps {
        table: Table<TData>,
        primaryAction?: DataTablePrimaryAction,
    }

    withDefaults(defineProps<DataTableActionsProps>(), {
        primaryAction: () => ({
            label: 'New',
        }),
    });
</script>

<template>
    <div class="flex flex-row items-center justify-between">
        <DataTableSearch :table="table" />

        <ButtonGroup>
            <ButtonGroup>
                <DataTableFilterPicker :table="table" />
                <Button variant="ghost">
                    <ChevronsUpDown class="w-4 h-4" />
                </Button>
                <DataTableColumnToggle :table="table" />
            </ButtonGroup>

            <ButtonGroup>
                <Button
                    class="px-6"
                    type="button"
                    variant="outline"
                    @click="primaryAction?.onClick?.()"
                >
                    {{ primaryAction?.label ?? 'New' }}
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    </div>
</template>
