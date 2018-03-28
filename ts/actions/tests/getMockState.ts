import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { testData } from "./../../testData";
import { IPostListState } from "./../postListStateAction";

export function getMockState(): IPostListState {
    const result = {
        postViewModels: testData.map((x) => CreatePostViewModel(x)),
        currentFocusIndex: 0,
    };
    result.postViewModels[0].focus = true;
    return result;
}
