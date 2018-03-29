import { Action } from "./action";
import { IPostListState } from "./postListStateAction";
export class MergeWithPrev extends Action<IPostListState> {
    public constructor(private targetIndex: number) {
        super();
    }

    protected modifyState(state: IPostListState): IPostListState {
        const index =
            this.targetIndex === -1 ?
            state.currentFocusIndex :
            this.targetIndex;

        const toBeRemoved = state.postViewModels.splice(index, 1)[0];
        state.postViewModels[index - 1].value += " " + toBeRemoved.value;
        state.currentFocusIndex = index - 1;
        return state;
    }
}
