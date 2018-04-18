import * as request from "superagent";
export class Controller {
    protected request: any;
    protected url: string;
    constructor() {
        this.url = "http://35.197.130.54/";
        // this.url = "http://localhost/";
        this.request = request;
    }
}
