import { useEffect, useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Styles/GlobalStyles.scss'

import NavBar from './Pages/Layout/NavBar';
import Footer from './Pages/Layout/Footer'
import Routes from './routes'
import { AuthProvider, AuthContext } from './Services/AuthContext';
import HttpService from './Services/HttpService';

function App() {
  const getPeople = HttpService().getPeople
  const [paginationOpts, setPaginationOpts] = useState({after: null, before: null})
  const [persons, setPersons] = useState(null)
  const {loading} = useContext(AuthContext)

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
    persons && !loading? (
      <BrowserRouter>
        <AuthProvider>
          <NavBar />  
          <Routes 
            persons={persons}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    ) : <></>
  );
}

export default App;
