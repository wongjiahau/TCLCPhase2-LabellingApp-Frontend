import { expect } from "chai";
import { clone } from "../../libs/clone";
import { MergeWithPrev } from "../mergeWithPrev";
import {getMockState} from "./getMockState";

describe("MergeWithPrev", () => {
    it("should not throw error if currentFocusIndex = 0", () => {
        const originalState = getMockState();
        expect(originalState.currentFocusIndex).to.eq(0);
        expect(() => {
            const action = new MergeWithPrev(-1);
            const newState = action.run(clone(originalState));
        }).to.not.throw();
    });

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

    it("should retain the original length", () => {
        const state = getMockState();
        expect(state.postViewModels).to.have.lengthOf(20);
        const action = new MergeWithPrev(3);
        const newState = action.run(state);
        expect(newState.postViewModels).to.have.lengthOf(20);
    });

    it("should set the isAbsorbed of target postViewModel to true ", () => {
        const state = getMockState();
        const targetIndex = 3;
        expect(state.postViewModels[targetIndex].isAbsorbed).to.eq(false);
        const action = new MergeWithPrev(3);
        const newState = action.run(state);
        expect(newState.postViewModels[targetIndex].isAbsorbed).to.eq(true);
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
        expect(newState.postViewModels[newState.currentFocusIndex].focus).to.eq(true);
    });

    it("should set the semantic_value according to the bottom one", () => {
        const state = getMockState();
        state.postViewModels[2].semantic_value = "pending";
        state.postViewModels[3].semantic_value = "negative";
        const action = new MergeWithPrev(3);
        const newState = action.run(state);
        expect(newState.postViewModels[2].semantic_value).to.eq("negative");
    });

    it("should not merge 2 sentence that belongs_to different group", () => {
        const state = getMockState();
        expect(state.postViewModels[0].belongs_to)
            .to.not.eq(state.postViewModels[1].belongs_to);
        const newState = new MergeWithPrev(1).run(state);
        expect(state).to.deep.eq(newState);
    });

    it("should set the absorbees property", () => {
        const state = getMockState();
        const newState = new MergeWithPrev(3).run(state);
        expect(newState.postViewModels[2].absorbees)
            .to.deep.eq([
                state.postViewModels[3]._id
            ]);
    });

    it("should set the absorbees property to have the absorbees of absorbees", () => {
        const originalState = getMockState();
        const newState1 = new MergeWithPrev(4).run(originalState);
        const newState2 = new MergeWithPrev(3).run(newState1);
        expect(newState2.postViewModels[2].absorbees)
            .to.deep.eq([
                originalState.postViewModels[3]._id,
                originalState.postViewModels[4]._id
            ]);
    });
});
