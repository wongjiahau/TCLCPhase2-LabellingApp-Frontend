import { Controller } from "./Controller";

export class ProgressController extends Controller {
    constructor(language) {
        super();
        this.language = language;
    }

    getData(callback) {
        this.request
            .get(`${this.url}fetchAdminDataEnglish`)
            .use(this.nocache) // Prevents caching of *only* this request
            .end((err1, res1) => {
                this.request
                    .get(`${this.url}fetchAdminDataChinese`)
                    .use(this.nocache) // Prevents caching of *only* this request
                    .end((err2, res2) => {
                        console.log(res1);
                        callback(err2,  transformProgressData(res1.body.concat(res2.body)));
                    });
            });
    }
}

export function transformProgressData(data) {
    console.log(data);
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