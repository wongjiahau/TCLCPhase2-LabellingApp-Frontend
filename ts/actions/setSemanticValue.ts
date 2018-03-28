import { SemanticValue } from "../model/submitData";
import {IPostListState, IPostListStateAction} from "./postListStateAction";

export class SetSemanticValue implements IPostListStateAction {
    public constructor(
        private newSemanticValue: SemanticValue,
        private targetIndex: number) {}

    public run(state: IPostListState): IPostListState {
        const index =
            this.targetIndex === -1 ?
            state.currentFocusIndex :
            this.targetIndex;
        state.postViewModels[index].semantic_value = this.newSemanticValue;
        state.postViewModels[index].focus = true;
        return state;
    }
}
