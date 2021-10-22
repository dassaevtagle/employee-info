import { createContext, useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import HttpService from './HttpService'

const AuthContext = createContext({
  isAuth: null, 
  loading: null,
  username: null,
});

const AuthProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(null);
  const [cookies, setCookie] = useCookies(['t']);
  const isAuthAxios = HttpService().isAuth
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null)

  useEffect(()=>{
    (async () =>{
      if(cookies.t){
        try {
          setLoading(true);
          let response = await isAuthAxios(cookies.t);
          setUsername(response.data.username)
          setIsAuth(true)
        } catch (error){
          setUsername(null)
          setIsAuth(false)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [setIsAuth, cookies])

  const context = {
    isAuth,
    loading,
    username
  };

  return ( 
    <AuthContext.Provider value={context}>
        {/* I usually do this for extra flexibility */}
        {typeof children === 'function' ? children(context) : children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };