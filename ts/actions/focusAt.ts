import { Action } from "./action";
import { IPostListState } from "./postListStateAction";

export class FocusAt extends Action<IPostListState> {
    public constructor(private targetIndex) {
        super();
    }

    protected modifyState(state: IPostListState): IPostListState {
        state.postViewModels.forEach((p) => {
            p.focus = false;
        });
        state.postViewModels[this.targetIndex].focus = true;
        state.currentFocusIndex = this.targetIndex;
        return state;
    }
}
