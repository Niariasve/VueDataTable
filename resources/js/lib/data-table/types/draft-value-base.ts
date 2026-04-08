export type DraftValueBase<TOperator extends string, TValue> = {
    operator: TOperator;
    value: TValue;
};