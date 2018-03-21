import {expect} from 'chai';
import { transformProgressData } from '../controllers/ProgressController';

describe('transformProgressData', () => {
    it('case 1', () => {
        const input = [
            { "_id": { "source": "facebook", "semantic_value": "unassigned" }, "total": 99 },
            { "_id": { "source": "facebook", "semantic_value": "positive"   }, "total": 22 }, 
            { "_id": { "source": "facebook", "semantic_value": "negative"   }, "total": 33 }, 
            { "_id": { "source": "blog"    , "semantic_value": "pending"    }, "total": 44 }, 
            { "_id": { "source": "blog"    , "semantic_value": "neutral"    }, "total": 55 },
            { "_id": { "source": "blog"    , "semantic_value": "positive"   }, "total": 55 }
        ];
        const expected = {
            positive: [{x: 'facebook', y: 22}, {x: 'blog', y: 55}],
            neutral:  [{x: 'blog', y: 55}],
            negative: [{x: 'facebook', y: 33}],
            pending:  [{x: 'blog', y: 44}],
            unassigned: [{x: 'facebook', y: 99}]
        };
        const result = transformProgressData(input);
        console.log(JSON.stringify(result));
        expect(result).to.deep.eq(expected);
    });
});