import { ISubmitData } from "../model/submitData";
import { IPost } from "./../model/post";
import { IRequestData } from "./../model/requestData";
import { Controller } from "./Controller";

export interface ILabellingController {
    getPosts(callback: (error: any, response: IRequestData) => void) : void;
    submit(submitData: ISubmitData,  callback: (error: any, response: any) => void) : void;
}

export type Language = "English" | "Chinese";
export class LabellingController extends Controller implements ILabellingController {
    private language: Language;
    constructor(language: Language) {
        super();
        this.language = language;
        if (language !== "English" && language !== "Chinese") {
            throw new Error(`Expected 'English' or 'Chinese' but you passed in '${language}'`);
        }
    }
    public getPosts(callback : (error: any, response: IRequestData) => void) {
        this.request
            .get(`${this.url}getPosts${this.language}`)
            // .use(this.nocache) // Prevents caching of *only* this request
            .end((err: any, res: any) => {
                callback(err, res.body);
            });
    }

    public submit(submitData: ISubmitData, callback: (error: any, response: any) => void) {
        this.request
            .post(`${this.url}submit${this.language}`)
            .send(submitData)
            .set("accept", "json")
            .end((err: any, res: any) => {
                callback(err, res);
            });
        console.log(submitData);
        console.log("Submiting updates");
    }

}
