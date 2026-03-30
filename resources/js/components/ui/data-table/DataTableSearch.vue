<script setup lang='ts' generic="TData">
    import { Search, X } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button';
    import { Table } from '@tanstack/vue-table';
    import { ref } from 'vue';
    import {
        InputGroup,
        InputGroupAddon,
        InputGroupButton,
        InputGroupInput,
        InputGroupText,
        InputGroupTextarea
    } from '@/components/ui/input-group'

    interface DataTableSearchProps {
        table: Table<TData>,
    }

    defineProps<DataTableSearchProps>();
</script>

<template>
    <InputGroup class="h-8 w-56 [--radius:9999px]">
        <InputGroupInput placeholder="Type to search..."
            @update:model-value="table.setGlobalFilter($event.toString())" />

        <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs">
                <X />
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>
</template>