export class Controller {
    constructor() {
        this.url = "http://35.198.216.245/";
        this.nocache = require('superagent-no-cache');
        this.request = require('superagent');
    }
}