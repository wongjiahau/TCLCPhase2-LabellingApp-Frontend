import * as request from "superagent";
export class Controller {
    protected request: any;
    protected url: string;
    constructor() {
        const DEBUGGING = false;
        this.url =  DEBUGGING ?
                    "http://localhost:3000/" :
                    "http://35.187.254.103:3000/";
        this.request = request;
    }
}
