# Video Jukebox
Select video clips grouped into album / collection.

[Example: jkboxed.com](http://jkboxed.com)

## `Build and Test`
cd into home dir
```
yarn build
```
Creates a release dir and populates with index.html .js and .css bundles

```
cd release
mkdir assets
cp videoj* assets/
```

Copy image assets from /public/assets
Copy data dir and current json into assets.

Launch Python test web server in release dir
```
python3 -m http.server
```

Open browser to http://localhost:8000

# Managment Application
To create / edit the json files that define collection:

```
cd management
yarn start
```
Open browser to http://localhost:8080/
