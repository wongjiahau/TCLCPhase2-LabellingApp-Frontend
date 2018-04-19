import { IPost } from "./../model/post";
export interface IPostViewModel extends IPost {
    focus: boolean;
    absorbees: string[];
    isAbsorbed: boolean;
    isMalay: boolean;
}

export function CreatePostViewModel(post: IPost): IPostViewModel {
    return {
        ...post,
        focus: false,
        absorbees: [],
        isAbsorbed: false,
        isMalay: false
    };
}
