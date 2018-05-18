import * as request from "superagent";
export class Controller {
    protected request: any;
    protected url: string;
    constructor() {
        const DEBUGGING = true;
        this.url =  DEBUGGING ?
                    "http://localhost/" :
                    "http://35.187.254.103/";
        this.request = request;
    }
}
