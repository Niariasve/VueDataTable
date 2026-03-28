<script setup lang='ts' generic="TData">
    import type { Table } from '@tanstack/vue-table';
    import { computed } from 'vue';
    import { Eye } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button'
    import {
        DropdownMenu,
        DropdownMenuCheckboxItem,
        DropdownMenuContent,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'

    interface ColumnToggleProps {
        table: Table<TData>,
    }

    const props = defineProps<ColumnToggleProps>();

    const columns = computed(() => props.table.getAllColumns().filter((column) => column.getCanHide()));
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
                <Eye class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem v-for="column in columns" :key="column.id" class="capitalize"
                :model-value="column.getIsVisible()" @update:model-value="(value) => column.toggleVisibility(!!value)">
                {{ column.id }}
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style></style>