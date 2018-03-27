export type SemanticValue = "pending" | "unassigned" | "positive" | "negative" | "neutral";

export interface ISubmitData {
    updates: {[key: string] : SemanticValue};
    merges:  number[][];
}
