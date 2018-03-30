export type SemanticValue = "pending" | "unassigned" | "positive" | "negative" | "neutral";

export interface IMerge {
    absorber: string;
    beingAbsorbed: string;
}

export interface ISubmitData {
    updates: {[key: string] : SemanticValue};
    merges:  IMerge[];
}
