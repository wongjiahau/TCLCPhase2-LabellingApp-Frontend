import { expect } from "chai";
import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { FocusNext } from "../focusNext";
import { testData } from "./../../testData";
import { FocusPrev } from "./../focusPrev";
import {getMockState} from "./getMockState";

const getInitialState = () => {
    return new FocusNext().run(getMockState());
};

describe("FocusPrev", () => {
    it("should decrease the currntFocusIndex", () => {
        const state = getInitialState();
        const action = new FocusPrev();
        const newState = action.run(state);
        expect(newState.currentFocusIndex).to.eq(0);
    });

    it("should set the previous postViewModel to be focused", () => {
        const state = getInitialState();
        const action = new FocusPrev();
        const newState = action.run(state);
        expect(newState.currentFocusIndex).to.eq(0);
        expect(newState.postViewModels[1].focus).to.eq(false);
        expect(newState.postViewModels[0].focus).to.eq(true);
    });

    it("should allow the first one to stay focused", () => {
        const state = getMockState();
        expect(state.currentFocusIndex).to.eq(0);
        const action = new FocusPrev();
        const newState = action.run(state);
        expect(newState.currentFocusIndex).to.eq(0);
        expect(newState.postViewModels[0].focus).to.eq(true);
    });
});
