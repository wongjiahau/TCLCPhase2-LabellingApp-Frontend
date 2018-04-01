import { expect } from "chai";
import {getMockState} from "../../actions/tests/getMockState";
import {extractSubmitData} from "../extractSubmitData";
import { MergeWithPrev } from "./../../actions/mergeWithPrev";
import { SetSemanticValue } from "./../../actions/setSemanticValue";

describe("extractSubmitData", () => {
    it("case 1", () => {
        const state = getMockState();
        const newState1 = new SetSemanticValue("positive", 1).run(state);
        const newState2 = new MergeWithPrev(3).run(newState1);
        const result = extractSubmitData(newState2.postViewModels);
        const expected = {
            updates: {
                2: "positive"
            },
            merges: [
                {
                    absorber: "3",
                    absorbees: ["4"]
                }
            ]
        };
        expect(result).to.deep.eq(expected);
    });
});
