<script setup lang="ts" generic="TData">
    import {
        useVueTable,
        ColumnDef,
        FlexRender,
        getCoreRowModel,
        getPaginationRowModel,
        getSortedRowModel,
    } from '@tanstack/vue-table';
    import {
        Table,
        TableBody,
        TableCell,
        TableFooter,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table'
    import DataTablePagination from './DataTablePagination.vue';
    import ColumnToggle from './ColumnToggle.vue';

    const props = withDefaults(defineProps<{
        columns: ColumnDef<TData, any>[],
        data: TData[],
        showFooter?: boolean,
    }>(), {
        showFooter: true,
    });

    const table = useVueTable({
        get data() { return props.data },
        get columns() { return props.columns },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugColumns: true,
    });
</script>

<template>
    <ColumnToggle :table />
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id" :colspan="header.colSpan">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableCell :colspan="columns.length" class="h-24 text-center">
                        No Results.
                    </TableCell>
                </template>
            </TableBody>
            <TableFooter v-if="showFooter">
                <TableRow v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
                    <TableHead v-for="header in footerGroup.headers" :key="header.id" :colspan="header.colSpan">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.footer"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
    <div class="flex items-center justify-center md:justify-end py-4 space-x-2">
        <DataTablePagination :table="table" />
    </div>
</template>
