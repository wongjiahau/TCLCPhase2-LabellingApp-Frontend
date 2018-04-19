import { SemanticValue } from "../model/submitData";
import { Action } from "./action";
import { FocusAt } from "./focusAt";
import {IPostListState } from "./postListStateAction";

export class ToggleIsMalay extends Action<IPostListState> {
    public constructor(
        private targetIndex: number,
    ) { super(); }

    protected modifyState(state: IPostListState): IPostListState {
        const index =
            this.targetIndex === -1 ?
            state.currentFocusIndex :
            this.targetIndex;
        state.postViewModels[index].isMalay = !state.postViewModels[index].isMalay;
        return new FocusAt(index).run(state);
    }
}
