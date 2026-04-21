<script setup lang='ts'>
    import { ref } from 'vue';
    import type { DataTablePrimaryAction } from '@/data-table';
    import { DataTable } from '@/data-table';
    import { customerColumns } from '@/tables/customer-columns';
    import type { Customer } from '@/types/customer';

    const isCreateFormOpen = ref(false);

    const primaryAction: DataTablePrimaryAction = {
        label: 'New customer',
        onClick: () => {
            isCreateFormOpen.value = true;
        },
    };

    defineProps<{
        customers: Customer[],
    }>();
</script>

<template>
    <div class="grid place-items-center py-40">
        <div class="container space-y-4">
            <DataTable
                :columns="customerColumns"
                :data="customers"
                :primary-action="primaryAction"
            />

            <div
                v-if="isCreateFormOpen"
                class="rounded-md border bg-card p-4 shadow-sm"
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="space-y-1">
                        <h2 class="font-medium">Create customer</h2>
                        <p class="text-muted-foreground text-sm">
                            Example external form state controlled by the page.
                        </p>
                    </div>

                    <button
                        class="text-muted-foreground text-sm"
                        type="button"
                        @click="isCreateFormOpen = false"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
