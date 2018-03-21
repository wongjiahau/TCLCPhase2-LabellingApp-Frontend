import { Controller } from "./Controller";

export class ProgressController extends Controller {
    constructor(language) {
        super();
        this.language = language;
    }

    getData(callback) {
        this.request
            .get(`${this.url}fetchAdminData${this.language}`)
            .use(this.nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                callback(err, res);
            });
    }
}

export function transformProgressData(data) {
    const result = {
        positive:   [],
        neutral:    [],
        negative:   [],
        pending:    [],
        unassigned: [],
    };
    data.forEach((d) => {
        result[d._id.semantic_value].push({x: d._id.source, y: d.total});
    });
    return result;
}