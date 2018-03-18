const URL = "http://35.198.216.245/";
const nocache = require('superagent-no-cache');
const request = require('superagent');

export class LabellingController {
    getPostsEnglish(callback) {
        request
            .get(`${URL}getPostsEnglish`)
            .use(nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                callback(err, res);
            });
    }

    submit(updates) {
        request
            .post(`${URL}submitEnglish`)
            .send(updates)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(res);
                alert("Uploading data");
                // Redirect to another page
            });
        console.log(this.updates);
        console.log("Submiting updates");
    }

}