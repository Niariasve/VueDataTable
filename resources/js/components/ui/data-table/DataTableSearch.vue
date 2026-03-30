<script setup lang='ts' generic="TData">
    import { Search } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button';
    import { Table } from '@tanstack/vue-table';
    import { ref } from 'vue';
    import { Input } from '@/components/ui/input';
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

    const show = ref<boolean>(false);

    const handleShow = () => show.value = !show.value;
</script>

<template>

    <div class="flex flex-row items-center gap-0.5">
        <Button @click="handleShow" variant="ghost" size="sm">
            <Search class="w-4 h-4" />
        </Button>
        <template v-show="show">
            <InputGroup class="h-8 w-56">
                <InputGroupInput placeholder="Type to search" @update:model-value="table.setGlobalFilter($event.toString())" />
            </InputGroup>
        </template>
    </div>
</template>