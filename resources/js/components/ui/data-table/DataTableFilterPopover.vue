<script setup lang='ts' generic='TData'>
    import { DraftFilter } from '@/lib/data-table/types';
    import DataTableFilterTextPopoverContent from './DataTableFilterTextPopoverContent.vue';

    interface DataTableFilterPopoverProps {
        draftFilter: DraftFilter,
    }

    const props = defineProps<DataTableFilterPopoverProps>();
</script>

<template>
    <div v-if="draftFilter.type === 'text'">
        <DataTableFilterTextPopoverContent :columnId="draftFilter.id" />
    </div>
    <div v-else>
        Nothing.
    </div>
</template>

<style></style>