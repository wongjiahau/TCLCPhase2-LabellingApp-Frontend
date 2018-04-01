import Ajv from "ajv";
import {expect} from "chai";
import {ILabellingController, LabellingController} from "./../LabellingController";
import {MockLabellingController} from "./../MockLabellingController";

// The following schema is generated from https://jsonschema.net/
const schema = {
    $id: "http://example.com/example.json",
    required: [
        "filename", "posts"
    ],
    type: "object",
    definitions: {},
    $schema: "http://json-schema.org/draft-06/schema#",
    properties: {
        filename: {
            $id: "/properties/filename",
            type: "string",
            title: "The Filename Schema ",
            default: "",
            examples: ["20170808_carinet_2.csv"]
        },
        posts: {
            $id: "/properties/posts",
            type: "array",
            items: {
                $id: "/properties/posts/items",
                required: [
                    "_id", "date", "value", "origin",
                    "source", "related_to", "semantic_value",
                    "belongs_to"
                ],
                type: "object",
                properties: {
                    _id: {
                        $id: "/properties/posts/items/properties/_id",
                        type: "string",
                        title: "The _id Schema ",
                        default: "",
                        examples: ["1"]
                    },
                    date: {
                        $id: "/properties/posts/items/properties/date",
                        type: "string",
                        title: "The Date Schema ",
                        default: "",
                        examples: ["20170723"]
                    },
                    value: {
                        $id: "/properties/posts/items/properties/value",
                        type: "string",
                        title: "The Value Schema ",
                        default: "",
                        examples: ["mahathir's cronies vs najib's cronies"]
                    },
                    origin: {
                        $id: "/properties/posts/items/properties/origin",
                        type: "string",
                        title: "The Origin Schema ",
                        default: "",
                        examples: ["scrape-results/blog/rockybru_20170801_160034.csv"]
                    },
                    source: {
                        $id: "/properties/posts/items/properties/source",
                        type: "string",
                        title: "The Source Schema ",
                        default: "",
                        examples: ["blog"]
                    },
                    related_to: {
                        $id: "/properties/posts/items/properties/related_to",
                        type: "array",
                        items: {
                            $id: "/properties/posts/items/properties/related_to/items",
                            type: "string",
                            title: "The 0th Schema ",
                            default: "",
                            examples: ["najib", "mahathir"]
                        }
                    },
                    semantic_value: {
                        $id: "/properties/posts/items/properties/semantic_value",
                        type: "string",
                        title: "The Semantic_value Schema ",
                        default: "",
                        examples: ["unassigned"]
                    },
                    belongs_to: {
                        $id: "/properties/posts/items/properties/belongs_to",
                        type: "string",
                        title: "The Belongs_to Schema ",
                        default: "",
                        examples: ["p0"]
                    }
                }
            }
        }
    }
};
const ajv = new Ajv();
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
const validate = ajv.compile(schema);
describe("Controller", () => {
    describe("get post", () => {
        it("case 1", (done) => {
            const mock : ILabellingController = new MockLabellingController();
            const real : ILabellingController = new LabellingController("English");
            mock.getPosts((error1, response1) => {
                const schema1IsValid = validate(response1);
                if (!schema1IsValid) {
                    console.log(validate.errors);
                } else {
                    console.log("success");
                }
                expect(schema1IsValid).to.eq(true);
                real.getPosts((error2, response2) => {
                    const schema2IsValid = validate(response2);
                    if (!schema2IsValid) {
                        console.log(validate.errors);
                    } else {
                        console.log("success");
                    }
                    expect(schema2IsValid).to.eq(true);
                    done();
                });
            });
        });
    });
});
