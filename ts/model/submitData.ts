export type SemanticValue = "pending" | "unassigned" | "positive" | "negative" | "neutral";

export interface IMerge {
    absorber: string;
    absorbees: string[];
}

export interface ISubmitData {
    updates: {[key: string] : SemanticValue};
    merges:  IMerge[];
    malayPosts: string[]; /*IDs of post that are identified as malay*/
}
