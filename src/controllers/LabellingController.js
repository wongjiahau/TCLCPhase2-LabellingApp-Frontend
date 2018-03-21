import { Controller } from './Controller';


export class LabellingController extends Controller {
    constructor(language){
        super();
        this.language = language;
        if(language !== 'English' && language !== 'Chinese') {
            throw new Error(`Expected 'English' or 'Chinese' but you passed in '${language}'`);
        }
    }
    getPosts(callback) {
        this.request
            .get(`${this.url}getPosts${this.language}`)
            .use(this.nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                callback(err, res);
            });
    }

    submit(updates, callback) {
        this.request
            .post(`${this.url}submit${this.language}`)
            .send(updates)
            .set('accept', 'json')
            .end((err, res) => {
                callback(err, res);
            });
        console.log(updates);
        console.log("Submiting updates");
    }

}