export type SemanticValue = "pending" | "unassigned" | "positive" | "negative" | "neutral";

export interface IMerge {
    absorber: string;
    absorbees: string[];
}

export interface ISubmitData {
    updates: {[key: string] : SemanticValue};
    merges:  IMerge[];
}
