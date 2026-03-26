<script setup lang='ts'>
    import { Customer } from '@/types';


    defineProps<{
        customers: Customer[],
    }>();
</script>

<template>
    <div class="grid place-items-center py-20">
        <div class="container">
            <div v-for="(c, index) in customers" :key="index">
                <p><span class="font-bold">Name: </span>{{ c.full_name }}</p>
            </div>
        </div>
    </div>
</template>