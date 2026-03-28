<script setup lang='ts' generic="TData">
    import {
        ButtonGroup,
        ButtonGroupSeparator,
        ButtonGroupText,
    } from '@/components/ui/button-group'
    import { Button } from '@/components/ui/button';
    import { ColumnToggle } from '@/components/ui/data-table';
    import { Table } from '@tanstack/vue-table';
import { ChevronsUpDown, ListFilter } from 'lucide-vue-next';

    interface DataTableActionsProps {
        table: Table<TData>,
    }

    defineProps<DataTableActionsProps>();
</script>

<template>
    <ButtonGroup>
        <ButtonGroup>
            <Button variant="ghost" size="sm">
                <ListFilter class="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
                <ChevronsUpDown class="w-4 h-4" />
            </Button>
            <ColumnToggle :table button-size="sm" />
        </ButtonGroup>
        <ButtonGroup>
            <Button class="px-6" variant="outline" size="sm">New</Button>
        </ButtonGroup>
    </ButtonGroup>
</template>

<style></style>