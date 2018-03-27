import { IPost } from "./../model/post";
export interface IPostViewModel extends IPost {
    focus: boolean;
}

function CreatePostViewModel(post: IPost): IPostViewModel {
    return {
        ...post,
        focus: false,
    };
}
