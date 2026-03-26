<script setup lang='ts'>
    import { DataTable } from '@/components/ui/data-table';
import { Customer, customerColumns } from '@/types';

    defineProps<{
        customers: Customer[],
    }>();
</script>

<template>
    <div class="grid place-items-center py-20">
        <div class="container">
            <DataTable :columns="customerColumns" :data="customers" />
        </div>
    </div>
</template>