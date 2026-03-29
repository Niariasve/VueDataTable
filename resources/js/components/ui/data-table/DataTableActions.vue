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
    <div class="flex flex-row gap-2">
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

<style>
    .show-enter-active,
    .show-leave-active {
        transition:
            width 300ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 140ms ease,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        transform-origin: left center;
    }

    .show-enter-from,
    .show-leave-to {
        width: 0;
        opacity: 0;
        transform: translateX(-6px);
    }

    .show-enter-to,
    .show-leave-from {
        width: 14rem;
        opacity: 1;
        transform: translateX(0);
    }

    .search-shell {
        overflow: hidden;
    }
</style>
