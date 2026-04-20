import { createColumnHelper } from '@tanstack/vue-table';
import { h } from 'vue';
import CustomersTableActions from '@/components/CustomersTableActions.vue';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import {
    dataTableSelectFilterFn,
    dataTableTextFilterFn,
} from '@/lib/data-table/filter-fns';
import { cn, formatDate } from '@/lib/utils';
import type { Customer } from '@/types/customer';

const columnHelper = createColumnHelper<Customer>();

export const customerColumns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: 'full_name',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Full Name',
            });
        },
        footer: 'Full Name',
        filterFn: dataTableTextFilterFn,
        meta: {
            dataTable: {
                label: 'Full Name',
                type: 'text',
                excludedOperators: ['is_empty', 'is_not_empty'],
            },
        },
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Email',
            });
        },
        footer: 'Email',
    }),
    columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Phone',
            });
        },
        footer: 'Phone',
    }),
    columnHelper.accessor((row) => row.gender, {
        id: 'gender',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Gender',
            });
        },
        footer: 'Gender',
        cell: (row) => {
            const gender = row.getValue();

            if (!gender) {
                return '-';
            }

            let genderClass = 'bg-gray-300';

            if (gender === 'Female') {
                genderClass = 'bg-red-400';
            }

            if (gender === 'Male') {
                genderClass = 'bg-blue-400';
            }

            return h(
                'div',
                { class: cn('rounded-xl border text-center', genderClass) },
                gender!,
            );
        },
        filterFn: dataTableSelectFilterFn,
        meta: {
            dataTable: {
                label: 'Gender',
                type: 'select',
                options: [
                    {
                        value: 'Male',
                        label: 'Male',
                    },
                    {
                        value: 'Female',
                        label: 'Female',
                    },
                    {
                        value: 'Other',
                        label: 'Other',
                    },
                ],
            },
        },
    }),
    // columnHelper.accessor(row => row.birth_date, {
    columnHelper.accessor((row) => formatDate(row.birth_date), {
        id: 'birth_date',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Birth Date',
            });
        },
        footer: 'Birth Date',
        // cell: row => formatDate(row.getValue()),
        cell: (row) => row.getValue(),
    }),
    columnHelper.accessor((row) => row.country, {
        id: 'country',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Country',
            });
        },
        footer: 'Country',
    }),
    columnHelper.accessor((row) => row.state, {
        id: 'state',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'State',
            });
        },
        footer: 'State',
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        footer: 'Actions',
        cell: () => h(CustomersTableActions),
    }),
];
