import { createContext, useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import HttpService from './HttpService'

const AuthContext = createContext({isAuth: null, loading: null});

const AuthProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(null);
  const [cookies, setCookie] = useCookies(['t']);
  const isAuthAxios = HttpService().isAuth
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (async () =>{
      if(cookies.t){
        try {
          setLoading(true);
          await isAuthAxios(cookies.t);
          setIsAuth(true)
        } catch (error){
          setIsAuth(false)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [setIsAuth, cookies])

  const context = {
    isAuth,
    loading
  };

  return ( 
    <AuthContext.Provider value={context}>
        {/* I usually do this for extra flexibility */}
        {typeof children === 'function' ? children(context) : children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };