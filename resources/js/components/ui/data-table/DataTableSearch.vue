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

    interface DataTableSearchProps {
        table: Table<TData>,
    }

    const props = defineProps<DataTableSearchProps>();

    const search = ref<string>('');
    const showClearSearch = ref<boolean>(false);
    const filterBy = ref<string>('');

    watch([search, filterBy], ([searchValue, filterValue]) => {
        if (filterBy.value.length > 0) {
            props.table.getColumn(filterValue)?.setFilterValue(searchValue);
        } else {
            props.table.setGlobalFilter(searchValue);
        }


        showClearSearch.value = searchValue.length > 0;
    });

    const clearSearch = () => {
        search.value = '';
    }

    const resetColumnFilters = () => {
        props.table.resetColumnFilters();
        filterBy.value = '';
    }
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

        <Select v-model="filterBy">
            <SelectTrigger>
                <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filter By</SelectLabel>
                    <div v-for="column in table.getAllColumns()">
                        <SelectItem v-if="column.getCanFilter() && column.getIsVisible()" class="capitalize" :key="column.id" :value="column.id">
                            {{ column.columnDef.id }}
                        </SelectItem>
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Button v-show="filterBy.length" variant="ghost" @click="resetColumnFilters">
            Reset
            <X class="size-4" />
        </Button>
    </div>
</template>