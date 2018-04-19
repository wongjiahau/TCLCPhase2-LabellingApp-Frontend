import { expect } from "chai";
import {getMockState} from "../../actions/tests/getMockState";
import { ToggleIsMalay } from "../../actions/toggleIsMalay";
import {extractSubmitData} from "../extractSubmitData";
import { MergeWithPrev } from "./../../actions/mergeWithPrev";
import { SetSemanticValue } from "./../../actions/setSemanticValue";

describe("extractSubmitData", () => {
    it("case 1", () => {
        const state = getMockState();
        const newState1 = new SetSemanticValue("positive", 1).run(state);
        const newState2 = new MergeWithPrev(3).run(newState1);
        const newState3 = new ToggleIsMalay(4).run(newState2);
        const newState4 = new ToggleIsMalay(0).run(newState3);
        const newState5 = new SetSemanticValue("negative", 6).run(newState4);
        const result = extractSubmitData(newState5.postViewModels);
        const expected = {
            updates: {
                2: "positive",
                7: "negative"
            },
            merges: [
                {
                    absorber: "3",
                    absorbees: ["4"]
                }
            ],
            malayPosts: [
                "1",
                "5",
            ]
        };
        expect(result).to.deep.eq(expected);
    });
});
