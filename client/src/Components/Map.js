import React, {useState, useCallback, memo, useEffect} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Axios from 'axios'

import personCard from './PersonCard';
const containerStyle = {
  width: '400px',
  height: '400px'
};

const getLongAndLat = () => {
  return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

const getCurrCountryData = ({lat, lng}) => {
  const url = `http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=${process.env.REACT_APP_GEONAMES_USER}`
  return Axios.get(url)
}

const getUsers = () => {
  const url = 'https://search.torre.co/people/_search/?size=20'
  return Axios.post(url)
}

/* user = {
  name,
  
} */

const Map = () => {
  /* const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS_KEY,
  }) */

  const [currCountryData, setCurrCountryData] = useState(null)
  const [users, setUsers] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(()=> {
    (async ()=> {
      try {
        //bring current location coordinates
        const position = await getLongAndLat(), {coords} = position
        const latLong = {
          lat: coords.latitude, 
          lng: coords.longitude
        }
        setLocation(latLong)
        //get current country
        const countryResp = await getCurrCountryData(latLong)
        setCurrCountryData(countryResp.data)
        const usersResp = await getUsers()
        setUsers(usersResp.data)
      } catch(error) {
        console.error(error)
      }
    })()
  }, [])

  return /* isLoaded */ null && location ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : (<div onClick={(() => console.log(users))}>{JSON.stringify(location)} &nbsp; {JSON.stringify(currCountryData)} &nbsp; {JSON.stringify(users)}</div>)
}

export default memo(Map)