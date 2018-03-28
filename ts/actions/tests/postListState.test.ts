import { expect } from "chai";
import { testData } from "../../testData";
import { CreatePostListState } from "../postListStateAction";

describe("PostListState", () => {
    describe("CreatePostListState", () => {
        it("should set currentFocusIndex to 0", () => {
            const result = CreatePostListState(testData);
            expect(result.currentFocusIndex).to.eq(0);
        });
    });
});
