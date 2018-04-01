import { IPost } from "./../model/post";
export interface IPostViewModel extends IPost {
    focus: boolean;
    absorbees: string[];
}

export function CreatePostViewModel(post: IPost): IPostViewModel {
    return {
        ...post,
        focus: false,
        absorbees: []
    };
}
