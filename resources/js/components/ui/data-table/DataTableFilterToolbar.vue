<script setup lang='ts' generic='TData'>
    import { CaseSensitive } from 'lucide-vue-next';
    import { Badge } from '@/components/ui/badge'
    import { DraftFilter } from '@/lib/data-table/types';

    interface DataTableFilterToolbarProps {
        filters: DraftFilter[],
    }

    defineProps<DataTableFilterToolbarProps>();

</script>

<template>
    <div class="flex flex-wrap gap-2">
        <Badge v-for="filter in filters" :key="filter.id" class="h-8 gap-2 cursor-pointer hover:bg-primary/90">
            <CaseSensitive class="size-4!" />
            {{ filter.label }}
        </Badge>
    </div>
</template>

<style></style>