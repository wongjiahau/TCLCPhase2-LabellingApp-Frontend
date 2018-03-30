import { expect } from "chai";
import { FocusAt } from "../focusAt";
import {getMockState} from "./getMockState";

describe("focusAt", () => {
    it("should set focus on the targeted postViewModel", () => {
        const targetIndex = 2;
        const state = getMockState();
        expect(state.postViewModels[targetIndex].focus).to.eq(false);
        const newState = new FocusAt(targetIndex).run(state);
        expect(newState.postViewModels[targetIndex].focus).to.eq(true);
    });

    it("should defocus every other postViewModels", () => {
        const state = getMockState();
        state.postViewModels[1].focus = true;
        state.postViewModels[2].focus = true;
        const newState = new FocusAt(3).run(state);
        expect(newState.postViewModels[1].focus).to.eq(false);
        expect(newState.postViewModels[2].focus).to.eq(false);
    });

    it("should set currentFocusIndex to targetIndex", () => {
        const state = getMockState();
        expect(state.currentFocusIndex).to.eq(0);
        const newState = new FocusAt(3).run(state);
        expect(newState.currentFocusIndex).to.eq(3);
    });

});
