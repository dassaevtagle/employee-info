import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Pages/Layout/NavBar';
import PeopleList from './Pages/PeopleList'
import PersonDetail from './Pages/PersonDetail';

import HttpService from './Services/HttpService';

function App() {
  const getPeople = HttpService().getPeople
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
