import * as request from "superagent";
export class Controller {
    protected request: any;
    protected url: string;
    constructor() {
        // this.url = "http://35.198.216.245/";
        this.url = "http://localhost:3000/";
        this.request = request;
    }
}
