import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios'

import PeopleList from './Pages/PeopleList'
import NavBar from './Pages/Layout/NavBar';
import PersonDetail from './Pages/PersonDetail';

const getPeople = async ({after, before}) => {
  let url = 'https://search.torre.co/people/_search?size=5'
  //add pagination if received string
  url = after ? url += `&after=${after}` : url
  url = before ? url += `&before=${before}` : url
  console.log('url', url)
  return Axios.post(url)
}

function App() {
  
  const [paginationOpts, setPaginationOpts] = useState({after: null, before: null})
  const [persons, setPersons] = useState(null)

  useEffect(()=> {
    (async ()=>{
      try{
        let response = await getPeople(paginationOpts)
        setPersons(response.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [setPaginationOpts, paginationOpts])

  const handlePrevious = () => {
    const options = {
      after: null,
      before: persons.pagination.previous
    }
    setPaginationOpts(options)
  }

  const handleNext = () => {
    const options = {
      after: persons.pagination.next,
      before: null
    }
    setPaginationOpts(options)
  }

  return ( 
    persons ? (
      <BrowserRouter>

        <NavBar />  
        <Switch>
          <Route 
              exact path="/" 
              render={(props) =>(
                <PeopleList 
                  {...props} 
                  persons={persons} 
                  handleNext={handleNext} 
                  handlePrevious={handlePrevious}
                />
              )} 
          />
          <Route path="/profile/:username" component={PersonDetail} />
        </ Switch>
      </BrowserRouter>
    ) : <></>
  );
}

export default App;
