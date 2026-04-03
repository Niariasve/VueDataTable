<script setup lang='ts'>
    import { DataTable } from '@/components/ui/data-table';
    import { customerColumns } from '@/tables/customer-columns';
    import { Customer } from '@/types/customer';

    defineProps<{
        customers: Customer[],
    }>();
</script>

<template>
    <div class="grid place-items-center py-40">
        <div class="container">
            <DataTable :columns="customerColumns" :data="customers" />
        </div>
    </div>
</template>