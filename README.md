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

## How to host this app?
Copy it to the Apache root.
```
sudo cp -r ./build/* /var/www/html
```

<del>
## How to deploy this app to surge?
Before that, set `DEBUGGING = false` in `Controller.ts`.  
And also, set the correct IP address in `Controller.ts`.  
Because Google Compute Engine (GCE) will have different IP address everytime it is restarted.
```
./deploy.sh
```
</del>