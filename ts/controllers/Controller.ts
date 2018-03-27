import * as request from "superagent";
import * as nocache from "superagent-no-cache";
export class Controller {
    protected nocache: any;
    protected request: any;
    protected url: string;
    constructor() {
        this.url = "http://35.198.216.245/";
        this.nocache = nocache;
        this.request = request;
    }
}
