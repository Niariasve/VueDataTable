import type { DataTableColumnType } from './data-table-column-type';
import type { TextDraftValue } from './text';

export type DraftFilter = {
    id: string;
    label: string;
    type: DataTableColumnType;
    draftValue: TextDraftValue;
};
