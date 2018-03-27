import { IPost } from "../model/post";
import { IRequestData } from "../model/requestData";
import { ISubmitData } from "../model/submitData";
import { testData } from "./../testData";
import { ILabellingController } from "./LabellingController";

export class MockLabellingController implements ILabellingController {
    public getPosts(callback: (error: any, response: IRequestData) => void): void {
        setTimeout(() => {
            callback(null, {filename: "20170808_carinet_2.csv", posts: testData});
        }, 500);
    }
    public submit(submitData: ISubmitData, callback: (error: any, response: any) => void): void {
        throw new Error("Method not implemented.");
    }
}
