import { expect } from "chai";
import { ToggleIsMalay } from "../toggleIsMalay";
import { getMockState } from "./getMockState";

describe("toggleIsMalay", () => {
    it("should toggle isMalay from false to true", () => {
        const targetIndex = 1;
        const state = getMockState();
        expect(state.postViewModels[targetIndex].isMalay).to.eq(false);
        const action = new ToggleIsMalay(targetIndex);
        const newState = action.run(state);
        expect(newState.postViewModels[targetIndex].isMalay).to.eq(true);
    });

    it("should toggle isMalay from true to false", () => {
        const targetIndex = 1;
        const state = getMockState();
        expect(state.postViewModels[targetIndex].isMalay).to.eq(false);
        const action = new ToggleIsMalay(targetIndex);
        const newState = action.run(state);
        expect(newState.postViewModels[targetIndex].isMalay).to.eq(true);
        const newState2 = action.run(newState);
        expect(newState2.postViewModels[targetIndex].isMalay).to.eq(false);
    });

});
