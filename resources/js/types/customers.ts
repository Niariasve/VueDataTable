import { createColumnHelper } from "@tanstack/vue-table"
import { h } from "vue";
import CustomersTableActions from "@/components/CustomersTableActions.vue";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { cn, formatDate } from "@/lib/utils";

export interface Customer {
    id: number,
    first_name: string,
    last_name: string,
    full_name: string,
    email: string | null,
    phone: string | null,
    document_type: string | null,
    document_number: string | null,
    birth_date: string | null,
    gender: string | null,
    company_name: string | null,
    tax_id: string | null,
    country: string | null,
    state: string | null,
    city: string | null,
    address: string | null,
    postal_code: string | null,
    notes: string | null,
    is_active: boolean,
    last_contacted_at: string | null,
    created_at: string,
    updated_at: string,
    deleted_at: string | null
}

const columnHelper = createColumnHelper<Customer>();

export const customerColumns = [
    columnHelper.accessor(row => `${row.first_name} ${row.last_name}`, {
        id: 'full_name',
        // header: 'Full Name',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Full Name',
            })
        },
        // footer: props => props.column.id,
        footer: 'Full Name',
    }),
    columnHelper.accessor(row => row.email, {
        id: 'email',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Email',
            })
        },
        footer: 'Email',
    }),
    columnHelper.accessor(row => row.phone, {
        id: 'phone',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Phone',
            })
        },
        footer: 'Phone',
    }),
    columnHelper.accessor(row => row.gender, {
        id: 'gender',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Gender',
            })
        },
        footer: 'Gender',
        cell: row => {
            const gender = row.getValue();

            if (!gender) { 
                return '-' 
            }

            let genderClass = 'bg-gray-300';

            if (gender === 'Female') { 
                genderClass = 'bg-red-400';
            }

            if (gender === 'Male') {
                genderClass = 'bg-blue-400';
            }

            return h('div', { class: cn('text-center border rounded-xl', genderClass) }, gender!);
        },
    }),
    // columnHelper.accessor(row => row.birth_date, {
    columnHelper.accessor(row => formatDate(row.birth_date), {
        id: 'birth_date',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Birth Date',
            })
        },
        footer: 'Birth Date',
        // cell: row => formatDate(row.getValue()),
        cell: row => row.getValue(),
    }),
    columnHelper.accessor(row => row.country, {
        id: 'country',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'Country',
            })
        },
        footer: 'Country',
    }),
    columnHelper.accessor(row => row.state, {
        id: 'state',
        header: ({ column }) => {
            return h(DataTableColumnHeader<Customer>, {
                column: column,
                title: 'State',
            })
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