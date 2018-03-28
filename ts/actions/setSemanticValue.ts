import { SemanticValue } from "../model/submitData";
import {IPostListState, PostListStateAction} from "./postListStateAction";

export class SetSemanticValue extends PostListStateAction {
    public constructor(
        postListState: IPostListState,
        private newSemanticValue: SemanticValue,
        private targetIndex: number) {
            super(postListState);
    }
    public run(): IPostListState {
        this.state.postViewModels[this.targetIndex].semantic_value = this.newSemanticValue;
        this.state.postViewModels[this.targetIndex].focus = true;
        return this.state;
    }
}
