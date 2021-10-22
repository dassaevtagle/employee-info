import { Switch, Route } from 'react-router-dom';

import PeopleList from './Pages/PeopleList'
import PersonDetail from './Pages/PersonDetail';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

const Routes = ({persons, handleNext, handlePrevious}) => {
  return (
    <Switch>
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
    </ Switch>
  )
}

export default Routes