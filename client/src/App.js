import { BrowserRouter } from 'react-router-dom';
import './Styles/GlobalStyles.scss'

import NavBar from './Pages/Layout/NavBar';
import Footer from './Pages/Layout/Footer'
import Routes from './routes'
import { AuthProvider, AuthContext } from './Services/AuthContext';

function App() {

  return ( 
    <BrowserRouter>
      <AuthProvider>
        <NavBar />  
        <Routes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
