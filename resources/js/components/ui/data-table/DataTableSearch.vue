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
        <Transition name="show">
            <div v-show="show" class="search-shell">
                <!-- <Input class="h-8 w-56" placeholder="Type to search"
                    @update:model-value="table.setGlobalFilter($event.toString())" /> -->
                <InputGroup class="h-8 w-56">
                    <InputGroupInput placeholder="Type to search" />
                </InputGroup>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

    .show-enter-active,
    .show-leave-active {
        transition:
            width 300ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 100ms ease,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        transform-origin: left center;
    }

    .show-enter-from,
    .show-leave-to {
        width: 0;
        opacity: 0;
        transform: translateX(-6px);
    }

    .show-enter-to,
    .show-leave-from {
        width: 14rem;
        opacity: 1;
        transform: translateX(0);
    }

    .search-shell {
        /* overflow: hidden; */
    }
</style>