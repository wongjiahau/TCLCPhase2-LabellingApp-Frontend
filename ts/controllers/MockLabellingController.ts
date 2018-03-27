import { IPost } from "../model/post";
import { ISubmitData } from "../model/submitData";
import { testData } from "./../testData";
import { ILabellingController } from "./LabellingController";

export class MockLabellingController implements ILabellingController {
    public getPosts(callback: (error: any, response: IPost[]) => void): void {
        setTimeout(() => {
            callback(null, testData);
        }, 500);
    }
    public submit(submitData: ISubmitData, callback: (error: any, response: any) => void): void {
        throw new Error("Method not implemented.");
    }
}