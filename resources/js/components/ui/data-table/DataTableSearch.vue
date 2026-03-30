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
        InputGroupText,
        InputGroupTextarea
    } from '@/components/ui/input-group'

    interface DataTableSearchProps {
        table: Table<TData>,
    }

    const props = defineProps<DataTableSearchProps>();

    const search = ref<string>('');
    const showClearSearch = ref<boolean>(false);

    watch(search, (value) => {
        props.table.setGlobalFilter(value);

        showClearSearch.value = value.length > 0;
    });

    const clearSearch = () => {
        search.value = '';
    }
</script>

<template>
    <InputGroup class="h-8 w-56 [--radius:9999px]">
        <InputGroupInput placeholder="Type to search..." v-model="search" />

        <InputGroupAddon align="inline-end">
            <InputGroupButton v-show="showClearSearch" @click="clearSearch" size="icon-xs">
                <X />
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>
</template>