import { expect } from "chai";
import { CreatePostViewModel } from "../../viewModel/postViewModel";
import { testData } from "./../../testData";
import { SetSemanticValue } from "./../setSemanticValue";
import {getMockState} from "./getMockState";

describe("setSemanticValue", () => {
    it("should change the semantic_value of the target postViewModel", () => {
        const state = getMockState();
        const targetIndex = 1;
        const action = new SetSemanticValue("positive", targetIndex);
        const newState = action.run(state);
        expect(newState.postViewModels[targetIndex].semantic_value).to.eq("positive");
    });

    it("should set the target postViewModel to be focused", () => {
        const state = getMockState();
        const targetIndex = 1;
        expect(state.postViewModels[targetIndex].focus).to.eq(false);
        const action = new SetSemanticValue("positive", targetIndex);
        const newState = action.run(state);
        expect(newState.postViewModels[targetIndex].focus).to.eq(true);
    });
});
