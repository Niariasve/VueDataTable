<script setup lang='ts' generic="TData">
    import { ButtonGroup } from '@/components/ui/button-group'
    import { Button } from '@/components/ui/button';
    import { ColumnToggle, DataTableSearch } from '@/components/ui/data-table';
    import { Table } from '@tanstack/vue-table';
    import { ChevronsUpDown, ListFilter } from 'lucide-vue-next';

    import { ref } from 'vue';
    import Filter from './Filter.vue';

    interface DataTableActionsProps {
        table: Table<TData>,
    }

    defineProps<DataTableActionsProps>();
</script>

<template>
    <div class="flex flex-row items-center justify-between">
        <DataTableSearch :table="table" />

        <ButtonGroup>
            <ButtonGroup>
                <Filter :table="table" />
                <Button variant="ghost">
                    <ChevronsUpDown class="w-4 h-4" />
                </Button>
                <ColumnToggle :table="table" />
            </ButtonGroup>

            <ButtonGroup>
                <Button class="px-6" variant="outline">New</Button>
            </ButtonGroup>
        </ButtonGroup>
    </div>
</template>
