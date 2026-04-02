<script setup lang='ts' generic='TData'>
    import { CaseSensitive, ListFilter, X } from 'lucide-vue-next';
    import { Badge } from '@/components/ui/badge'
    import { DraftFilter } from '@/lib/data-table/types';
    import { Popover, PopoverContent, PopoverTrigger } from '../popover';
    import { useDataTableFilters } from './useDataTableFilters';
    import { computed } from 'vue';
    import { ButtonGroup } from '../button-group';
    import { Button } from '../button';

    const filters = useDataTableFilters<TData>();

    const draftFilters = computed(() => filters.draftFilters.value);
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <ButtonGroup>
            <ButtonGroup v-for="filter in draftFilters" :key="filter.id">
                <Button variant="secondary">
                    <CaseSensitive v-if="filter.type === 'text'" />
                    <ListFilter v-else />
                    {{ filter.label }}
                </Button>
                <Button variant="secondary" @click="filters.removeDraftFilter(filter.id)">
                    <X />
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    </div>
</template>