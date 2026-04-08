import type { DraftValueBase } from '../draft-value-base';
import type { TextFilterOperator } from './text-filter-operator';

export type TextDraftValue = DraftValueBase<TextFilterOperator, string>;