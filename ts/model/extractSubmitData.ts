import { IPostViewModel } from "../viewModel/postViewModel";
import { IMerge, ISubmitData, SemanticValue } from "./submitData";

export function extractSubmitData(postViewModels: IPostViewModel[]): ISubmitData {
    const updates: {[key: string] : SemanticValue} = {};
    const merges : IMerge[] = [];
    const malayPosts: string[] = [];
    postViewModels.forEach((p) => {
        if (p.semantic_value !== "unassigned") {
            updates[p._id] = p.semantic_value;
        }
        if (p.absorbees.length > 0) {
            merges.push({
                absorber: p._id,
                absorbees: p.absorbees
            });
        }
        if (p.isMalay) {
            malayPosts.push(p._id);
        }
    });
    return { updates, merges, malayPosts };

}
