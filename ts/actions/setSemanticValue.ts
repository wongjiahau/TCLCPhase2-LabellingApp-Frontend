import { SemanticValue } from "../model/submitData";
import {IPostListState, IPostListStateAction} from "./postListStateAction";

export class SetSemanticValue implements IPostListStateAction {
    public constructor(
        private newSemanticValue: SemanticValue,
        private targetIndex: number) {}

    public run(state: IPostListState): IPostListState {
        state.postViewModels[this.targetIndex].semantic_value = this.newSemanticValue;
        state.postViewModels[this.targetIndex].focus = true;
        return state;
    }
}
