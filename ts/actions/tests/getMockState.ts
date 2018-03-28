import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { testData } from "./../../testData";
import { IPostListState } from "./../postListStateAction";

export function getMockState(): IPostListState {
    return {
        postViewModels: testData.map((x) => CreatePostViewModel(x)),
        currentFocusIndex: 0,
    };
}
