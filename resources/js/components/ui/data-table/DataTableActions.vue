<script setup lang='ts' generic="TData">
    import { ButtonGroup } from '@/components/ui/button-group'
    import { Button } from '@/components/ui/button';
    import { ColumnToggle, DataTableSearch } from '@/components/ui/data-table';
    import { Table } from '@tanstack/vue-table';
    import { ChevronsUpDown, ListFilter } from 'lucide-vue-next';
    
    import { ref } from 'vue';

    interface DataTableActionsProps {
        table: Table<TData>,
    }

    defineProps<DataTableActionsProps>();

    const show = ref<boolean>(false);

    const handleShow = () => show.value = !show.value;
</script>

<template>
    <div class="flex flex-row items-center gap-2 p-2">
        <ButtonGroup>
            <Button variant="ghost" size="sm">
                <ListFilter class="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
                <ChevronsUpDown class="w-4 h-4" />
            </Button>
            <ColumnToggle :table button-size="sm" />
        </ButtonGroup>

        <DataTableSearch :table />

        <ButtonGroup>
            <Button class="px-6" variant="outline" size="sm">New</Button>
        </ButtonGroup>
    </div>
</template>
