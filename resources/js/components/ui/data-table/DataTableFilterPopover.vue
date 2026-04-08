<script setup lang='ts' generic='TData'>
    import { DraftFilter } from '@/lib/data-table/types';
    import { DataTableFilterTextPopoverContent } from '.';

    interface DataTableFilterPopoverProps {
        draftFilter: DraftFilter,
    }

    defineProps<DataTableFilterPopoverProps>();
</script>

<template>
    <div v-if="draftFilter.type === 'text'">
        <DataTableFilterTextPopoverContent :columnId="draftFilter.id" />
    </div>
    <div v-else>
        Filter type not supported yet.
    </div>
</template>

<style></style>