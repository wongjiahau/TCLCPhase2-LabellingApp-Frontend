# TCLCPhase2-LabellingApp-Frontend

## How to get started?
### First, transpile the code
```
./transpile
```

### Then, run the development server
```
npm run start
```

### What is the expected post json format?
```json
{
    updates: [
        {"id": "1", "semantic_value": "newSemanticValue"}
    ],
    merges: [
        [1,2],
        [3,4]
    ]
}
```