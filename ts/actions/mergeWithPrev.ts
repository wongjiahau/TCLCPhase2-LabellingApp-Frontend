import { IPostListState, IPostListStateAction } from "./postListStateAction";
export class MergeWithPrev implements IPostListStateAction {
    public constructor(private targetIndex: number) {}
    public run(state: IPostListState): IPostListState {
        const toBeRemoved = state.postViewModels.splice(this.targetIndex, 1)[0];
        state.postViewModels[this.targetIndex - 1].value += " " + toBeRemoved.value;
        return state;
    }
}
