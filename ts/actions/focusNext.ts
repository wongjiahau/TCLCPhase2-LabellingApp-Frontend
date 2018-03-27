import {clone} from "../libs/clone";
import { IPostViewModel } from "./../viewModel/postViewModel";

export function focusNext(posts: IPostViewModel[]): IPostViewModel[] {
    const newPosts = clone(posts);
    for (let i = 0; i < newPosts.length; i++) {
        const p = newPosts[i];
        if (p.focus === true) {
            if (i !== newPosts.length - 1) {
                p.focus = false;
                newPosts[i + 1].focus = true;
                break;
            }
        }
    }
    return newPosts;
}
