import { expect } from "chai";
import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { focusNext } from "../focusNext";
import { focusPrev } from "../focusPrev";
import { testData } from "./../../testData";
describe("focusPrev", () => {
    it("case 1", () => {
        const posts = testData.map((x) => CreatePostViewModel(x));
        posts[1].focus = true;
        expect(posts[0].focus).to.eq(false);
        const newPosts = focusPrev(posts);
        expect(newPosts[1].focus).to.eq(false);
        expect(newPosts[0].focus).to.eq(true);
    });

    it("should allow the first one to stay focus", () => {
        const posts = testData.map((x) => CreatePostViewModel(x));
        posts[0].focus = true;
        expect(posts[1].focus).to.eq(false);
        const newPosts = focusPrev(posts);
        expect(newPosts[0].focus).to.eq(true);
    });
});
