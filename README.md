# dbgeo-stream

A simplified streaming version of [dbgeo](https://github.com/jczaplew/dbgeo) for use with [node-pg-query-stream](https://github.com/brianc/node-pg-query-stream). Takes as an input a readable object stream, and each object must have a property `geom` which is a WKB geometry. Will output a valid GeoJSON `FeatureCollection` as a stream that can be piped directly to a file or HTTP response.


###### Installation
````
npm install @macrostrat/dbgeo-stream
````

###### Example Usage
````javascript
const dbgeoStream = require('@macrostrat/dbgeo-stream')

// Connect to Postgres, etc...
let query = new QueryStream('SELECT id, geom FROM land', [])
client.query(query)
  .pipe(dbgeoStream)
  .pipe(res)

````

## License
MIT
 