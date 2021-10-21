import React from "react"
import { Map, Marker } from "pigeon-maps"

 const LocationMap = ({lat, lng}) => {
  return (
    <Map height={300} defaultCenter={[lat,lng]} defaultZoom={11}>
      <Marker width={50} anchor={[lat, lng]} />
    </Map>
  )
}

export default LocationMap