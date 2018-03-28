import { expect } from "chai";
import { getMockState } from "./getMockState";

describe("getMockState", () => {
    it("all postViewModels should be unfocused", () => {
        const state = getMockState();
        state.postViewModels.forEach((p) => {
            expect(p.focus).to.eq(false);
        });
    });

    it("initial currentFocusIndex should be 0", () => {
        const state = getMockState();
        expect(state.currentFocusIndex).to.eq(0);
    });
});
