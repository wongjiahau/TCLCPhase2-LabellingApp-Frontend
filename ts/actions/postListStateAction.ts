import { clone } from "../libs/clone";
import { IPost } from "../model/post";
import {CreatePostViewModel, IPostViewModel} from "./../viewModel/postViewModel";
import {Action} from "./action";

export interface IPostListState {
    postViewModels : IPostViewModel[];
    currentFocusIndex : number;
}

export function CreatePostListState(posts: IPost[]): IPostListState {
    const result = posts.map((x) => CreatePostViewModel(x));
    result[0].focus = true;
    return {
        currentFocusIndex: 0,
        postViewModels: result,
    };

}
