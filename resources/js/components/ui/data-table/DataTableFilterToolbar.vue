<script setup lang='ts' generic='TData'>
    import { CaseSensitive } from 'lucide-vue-next';
    import { Badge } from '@/components/ui/badge'
    import { DraftFilter } from '@/lib/data-table/types';
    import { Popover, PopoverContent, PopoverTrigger } from '../popover';
    import { useDataTableFilters } from './useDataTableFilters';
    import { computed } from 'vue';

    const filters = useDataTableFilters<TData>();

    const draftFilters = computed(() => filters.draftFilters.value);
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <Popover>
            <PopoverTrigger as-child>
                <Badge variant="secondary" v-for="filter in draftFilters" :key="filter.id"
                    class="h-8 gap-2 cursor-pointer hover:bg-secondary/90">
                    <CaseSensitive class="size-4!" />
                    {{ filter.label }}
                </Badge>
            </PopoverTrigger>
            <PopoverContent>
                <div class="flex flex-col justify-between">

                </div>
            </PopoverContent>
        </Popover>



    </div>
</template>