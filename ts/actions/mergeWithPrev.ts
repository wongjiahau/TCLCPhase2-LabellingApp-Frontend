import { Action } from "./action";
import { FocusAt } from "./focusAt";
import { IPostListState } from "./postListStateAction";

export class MergeWithPrev extends Action<IPostListState> {
    public constructor(private targetIndex: number) {
        super();
    }

    /**
     * Keyword explanation:
     * [absorber] <-- [absorbee]
     * absorbee is the one that is to be merged into absorber
     */
    protected modifyState(state: IPostListState): IPostListState {
        const index =
            this.targetIndex === -1 ?
            state.currentFocusIndex :
            this.targetIndex;

        if (state.postViewModels[index].belongs_to !== state.postViewModels[index - 1].belongs_to) {
            return state;
        }

        const absorbee = state.postViewModels.splice(index, 1)[0];
        const absorber = state.postViewModels[index - 1];

        absorber.value += " " + absorbee.value;
        absorber.semantic_value = absorbee.semantic_value;

        return new FocusAt(index - 1).run(state);
    }
}
