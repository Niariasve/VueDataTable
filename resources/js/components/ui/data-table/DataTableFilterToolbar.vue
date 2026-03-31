<script setup lang='ts' generic='TData'>
    import { ChevronDown, Text } from 'lucide-vue-next';
    import { Table } from '@tanstack/vue-table';
    import { Badge } from '@/components/ui/badge'

    interface DataTableFilterToolbarProps {
        table: Table<TData>
    }

    defineProps<DataTableFilterToolbarProps>();

</script>

<template>
    <Badge class="h-8 gap-2 cursor-pointer hover:bg-primary/90">
        <Text class="size-4" />
        Badge
    </Badge>
</template>

<style></style>