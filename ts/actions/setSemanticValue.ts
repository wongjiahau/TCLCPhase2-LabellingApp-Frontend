import { SemanticValue } from "../model/submitData";
import { Action } from "./action";
import { FocusAt } from "./focusAt";
import {IPostListState } from "./postListStateAction";

export class SetSemanticValue extends Action<IPostListState> {
    public constructor(
        private newSemanticValue: SemanticValue,
        private targetIndex: number,
    ) { super(); }

    protected modifyState(state: IPostListState): IPostListState {
        const index =
            this.targetIndex === -1 ?
            state.currentFocusIndex :
            this.targetIndex;
        state.postViewModels[index].semantic_value = this.newSemanticValue;
        return new FocusAt(index).run(state);
    }

}
