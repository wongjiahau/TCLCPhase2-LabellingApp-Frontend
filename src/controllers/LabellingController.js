const URL = "http://35.198.216.245/";
const nocache = require('superagent-no-cache');
const request = require('superagent');

export class LabellingController {
    constructor(language){
        this.language = language;
        if(language !== 'English' && language !== 'Chinese') {
            throw new Error(`Expected 'English' or 'Chinese' but you passed in '${language}'`);
        }
    }
    getPosts(callback) {
        request
            .get(`${URL}getPosts${this.language}`)
            .use(nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                callback(err, res);
            });
    }

    submit(updates, callback) {
        request
            .post(`${URL}submit${this.language}`)
            .send(updates)
            .set('accept', 'json')
            .end((err, res) => {
                callback(err, res);
            });
        console.log(updates);
        console.log("Submiting updates");
    }

}