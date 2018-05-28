import * as request from "superagent";
import * as nocache from "superagent-no-cache";
export class Controller {
    protected request: any;
    protected url: string;
    protected nocache: any;
    constructor() {
        const DEBUGGING = false;
        this.url =  DEBUGGING ?
                    "http://localhost:3000/" :
                    "http://35.198.202.164/";
        this.request = request;
        this.nocache = nocache;
    }
}
