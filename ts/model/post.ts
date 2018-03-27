export interface IPost {
    _id:            string;
    date:           string;
    value:          string;
    origin:         string;
    source:         string;
    related_to:     string[];
    semantic_value: string;
    belongs_to:     string;
}
