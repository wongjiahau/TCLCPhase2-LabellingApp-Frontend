import { expect } from "chai";
import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { focusNext } from "../focusNext";
import { testData } from "./../../testData";

describe("focusNext", () => {
    it("case 1", () => {
        const posts = testData.map((x) => CreatePostViewModel(x));
        posts[0].focus = true;
        expect(posts[1].focus).to.eq(false);
        const newPosts = focusNext(posts);
        expect(newPosts[0].focus).to.eq(false);
        expect(newPosts[1].focus).to.eq(true);
    });

    it("should allow the last one to stay focused", () => {
        const posts = testData.map((x) => CreatePostViewModel(x));
        const lastIndex = posts.length - 1;
        posts[lastIndex].focus = true;
        const newPosts = focusNext(posts);
        expect(newPosts[lastIndex].focus).to.eq(true);
    });
});
