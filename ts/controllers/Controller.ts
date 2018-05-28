import * as request from "superagent";
export class Controller {
    protected request: any;
    protected url: string;
    constructor() {
        const DEBUGGING = false;
        this.url =  DEBUGGING ?
                    "http://localhost:3000/" :
                    "http://35.198.202.164/";
        this.request = request;
    }
}
