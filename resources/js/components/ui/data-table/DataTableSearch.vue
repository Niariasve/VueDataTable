<script setup lang='ts' generic="TData">
    import { Search } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button';
    import { Table } from '@tanstack/vue-table';
    import { ref } from 'vue';
    import { Input } from '@/components/ui/input';

    interface DataTableSearchProps {
        table: Table<TData>,
    }

    const show = ref<boolean>(false);

    const handleShow = () => show.value = !show.value;
</script>

<template>

    <div class="flex flex-row gap-0.5">
        <Button @click="handleShow" variant="ghost" size="sm">
            <Search class="w-4 h-4" />
        </Button>
        <Transition name="show">
            <div v-show="show" class="search-shell">
                <Input class="h-8 w-56" placeholder="Type to search" />
            </div>
        </Transition>
    </div>
</template>

<style></style>