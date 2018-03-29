import { expect } from "chai";
import { clone } from "../../libs/clone";
import { MergeWithPrev } from "../mergeWithPrev";
import {getMockState} from "./getMockState";

describe("MergeWithPrev", () => {
    it("should merge 2 post into 1 post", () => {
        const originalState = getMockState();
        const targetIndex = 3;
        const action = new MergeWithPrev(targetIndex);
        const newState = action.run(clone(originalState));
        const expected =
            originalState.postViewModels[2].value + " " +
            originalState.postViewModels[3].value;
        expect(newState.postViewModels[2].value).to.eq(expected);
    });

    it("should reduce the original length by 1", () => {
        const state = getMockState();
        expect(state.postViewModels).to.have.lengthOf(20);
        const action = new MergeWithPrev(3);
        const newState = action.run(state);
        expect(newState.postViewModels).to.have.lengthOf(19);
    });

    it("should merge the current focused postViewModel if targetIndex = -1", () => {
        const state = getMockState();
        state.currentFocusIndex = 3;
        const newState1 = new MergeWithPrev(-1).run(state);
        const newState2 = new MergeWithPrev(3).run(state);
        expect(newState1).to.deep.eq(newState2);
    });

    it("should change the focusIndex to the one that is merged into", () => {
        const originalState = getMockState();
        expect(originalState.currentFocusIndex).to.eq(0);
        const targetIndex = 3;
        const action = new MergeWithPrev(targetIndex);
        const newState = action.run(clone(originalState));
        expect(newState.currentFocusIndex).to.eq(targetIndex - 1);
    });

    it("should set the semantic_value according to the bottom one", () => {

    });
});
