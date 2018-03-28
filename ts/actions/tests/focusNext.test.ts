import { expect } from "chai";
import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { FocusNext } from "../focusNext";
import { testData } from "./../../testData";
import {getMockState} from "./getMockState";

describe("focusNext", () => {
    it("should increase the currntFocusIndex", () => {
        const state = getMockState();
        const action = new FocusNext(state);
        const newState = action.run();
        expect(newState.currentFocusIndex).to.eq(1);
    });

    it("should set the next postViewModel to be focused", () => {
        const state = getMockState();
        const action = new FocusNext(state);
        const newState = action.run();
        expect(newState.currentFocusIndex).to.eq(1);
        expect(newState.postViewModels[0].focus).to.eq(false);
        expect(newState.postViewModels[1].focus).to.eq(true);
    });

    it("should allow the last one to stay focused", () => {
        const state = getMockState();
        const lastIndex = state.postViewModels.length - 1;
        state.currentFocusIndex = lastIndex;
        state.postViewModels[0].focus = false;
        state.postViewModels[state.currentFocusIndex].focus = true;
        const action = new FocusNext(state);
        const newState = action.run();
        expect(newState.currentFocusIndex).to.eq(lastIndex);
        expect(newState.postViewModels[lastIndex].focus).to.eq(true);
    });
});
