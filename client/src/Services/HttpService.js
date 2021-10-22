import axios from "axios"

const HttpService = () => {
  const proto = {
    //Get list of people
    async getPeople ({after, before}){
      let url = 'https://search.torre.co/people/_search?size=5'
      //add pagination if received string
      url = after ? url += `&after=${after}` : url
      url = before ? url += `&before=${before}` : url
      return axios.post(url)
    },
    //Get detailed info of a person
    getPersonInfo(username){
      if(!username) return ''
      //cors-anywhere like 
      return axios.get(`https://mighty-brook-86503.herokuapp.com/http://bio.torre.co/api/bios/${username}`)
    },
    //Adds a person to favorite
    addToFavorite(person){
      console.log(person)
      return axios.post(`${process.env.REACT_APP_API_URL}/favorites`)
    },
    signup({username, password}){
      return axios.post(`${process.env.REACT_APP_API_URL}/signup`, {username, password})
    },
    login({username, password}){
      return axios.post(`${process.env.REACT_APP_API_URL}/signin`, {username, password})
    }
  }

  return Object.assign({}, proto);
}

export default HttpService