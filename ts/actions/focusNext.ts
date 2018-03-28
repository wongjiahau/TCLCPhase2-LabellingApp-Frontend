import {clone} from "../libs/clone";
import { IPostViewModel } from "./../viewModel/postViewModel";
import { IPostListState, PostListStateAction } from "./postListStateAction";

export class FocusNext extends PostListStateAction {
    public run(): IPostListState {
        const index = this.state.currentFocusIndex;
        if (index === this.state.postViewModels.length - 1) {
            return this.state;
        }
        this.state.currentFocusIndex++;
        this.state.postViewModels[index].focus = false;
        this.state.postViewModels[index + 1].focus = true;
        return this.state;
    }
}
