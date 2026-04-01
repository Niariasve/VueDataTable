<script setup lang='ts' generic="TData">
    import { Search, X } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button';
    import { Table } from '@tanstack/vue-table';
    import { ref, watch } from 'vue';
    import {
        InputGroup,
        InputGroupAddon,
        InputGroupButton,
        InputGroupInput,
    } from '@/components/ui/input-group'
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'
    import { useDataTableSearch } from './useDataTableSearch';

    interface DataTableSearchProps {
        table: Table<TData>,
    }

    const props = defineProps<DataTableSearchProps>();

    const {
        search,
        filterBy,
        showClearSearch,
        resetColumnFilters,
        clearSearch
    } = useDataTableSearch({ table: props.table });
</script>

<template>
    <div class="flex items-center gap-3">
        <InputGroup class="w-56">
            <InputGroupInput placeholder="Type to search..." v-model="search" />

            <InputGroupAddon align="inline-end">
                <InputGroupButton v-show="showClearSearch" @click="clearSearch" size="icon-xs">
                    <X />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>