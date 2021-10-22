import { Switch, Route, Redirect} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './Services/AuthContext';
import HttpService from './Services/HttpService';
import nProgress from 'nprogress';

import Spinner from './Components/Spinner'
import PeopleList from './Pages/PeopleList'
import PersonDetail from './Pages/PersonDetail';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';

const Routes = () => {
  const getPeople = HttpService().getPeople
  const [paginationOpts, setPaginationOpts] = useState({after: null, before: null})
  const [persons, setPersons] = useState(null)
  const {loading} = useContext(AuthContext)

  useEffect(()=> {
    (async ()=>{
      try{
        nProgress.start()
        let response = await getPeople(paginationOpts)
        setPersons(response.data)
      } catch (e) {
        console.error(e)
      } finally {
        nProgress.done()
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
    <Switch>
      {
        persons && !loading? (
        <>
          <Route exact path="/" >
            <PeopleList 
              persons={persons} 
              handleNext={handleNext} 
              handlePrevious={handlePrevious}
              />
          </Route> 
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:username" component={PersonDetail} />
          <Route path="/favorites/:username" />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </>
        ) : (
          <Spinner />
        )
      }
    </ Switch>
  )
}

export default Routes