import {clone} from "../libs/clone";
import { IPostViewModel } from "./../viewModel/postViewModel";
import { Action } from "./action";
import { IPostListState } from "./postListStateAction";

export class FocusNext extends Action<IPostListState> {
    protected modifyState(state: IPostListState): IPostListState {
        const index = state.currentFocusIndex;
        if (index === state.postViewModels.length - 1) {
                return state;
            }
        state.currentFocusIndex++;
        state.postViewModels[index].focus = false;
        state.postViewModels[index + 1].focus = true;
        return state;
    }
}
