import type { ColumnDef } from "@tanstack/vue-table";
import { createColumnHelper } from "@tanstack/vue-table"

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

export const defaultColumns = [
    columnHelper.accessor(row => `${row.first_name} ${row.last_name}`, {
        id: 'full_name',
    }),
];