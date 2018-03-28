import { expect } from "chai";
import { getMockState } from "./getMockState";

describe("getMockState", () => {
    it("all postViewModels should be unfocused except the first one", () => {
        const state = getMockState();
        state.postViewModels.slice(1).forEach((p) => {
            expect(p.focus).to.eq(false);
        });
        expect(state.postViewModels[0].focus).to.eq(true);
    });

    it("all postViewModels should have semantic_value of unassigned", () => {
        const state = getMockState();
        state.postViewModels.slice(1).forEach((p) => {
            expect(p.semantic_value).to.eq("unassigned");
        });
    });

    it("initial currentFocusIndex should be 0", () => {
        const state = getMockState();
        expect(state.currentFocusIndex).to.eq(0);
    });
});
