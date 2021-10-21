import { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Map from '../Components/Map'
import Axios from 'axios'

const getPersonInfo = (username) => {
  if(!username) return ''
  return Axios.get(`https://mighty-brook-86503.herokuapp.com/http://bio.torre.co/api/bios/${username}`)
}

const PersonDetail = () => {
  let { username } = useParams();

  const [person, setPerson] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        let response = await getPersonInfo(username)
        setPerson(response.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [person])

  return (
    person ? (
      <Fragment>
        

      </Fragment>
    ) : (
      <p>Person detail works</p>
    )
  )
}

export default PersonDetail