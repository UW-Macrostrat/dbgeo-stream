const wkx = require('wkx')
const { Transform } = require('stream')

function getProperties(attributes) {
  let properties = {}

  Object.keys(attributes).filter(d => {
    if (d !== 'geom') return d
  }).forEach(d => {
    properties[d] = attributes[d]
  })

  return properties
}


let dbgeoStream = new Transform({
  objectMode: true,
  transform: (chunk, encoding, callback) => {
    // Convert the wkb to geojson, parse properties
    let feature = {
      type: 'Feature',
      geometry: wkx.Geometry.parse(new Buffer(chunk.geom, 'hex')).toGeoJSON(),
      properties: getProperties(chunk)
    }
    
    // Instead of using the JSONStream module we are going to stringify ourselves
    callback(null, ',' + JSON.stringify(feature))
  },
  // When the stream has finished, finish the GeoJSON structure
  flush: (callback) => {
    dbgeoStream.push(']}')
    callback(null)
  } 
})
// Before any data is received, write the top level keys
dbgeoStream.push('{"type":"FeatureCollection","features":[')

 module.exports = dbgeoStream
