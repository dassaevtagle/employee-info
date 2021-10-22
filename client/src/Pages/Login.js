import '../Styles/Signup.scss'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useCookies } from 'react-cookie'
import HttpService from '../Services/HttpService'
import { Notyf } from 'notyf';

const Login = () => {
  const login = HttpService().login
  const [cookies, setCookie] = useCookies(['t']);
  let history = useHistory()
  const notyf = new Notyf()
  const handleLogin = async (values) => {
    try{
      let response = await login(values)
      setCookie('t', response.data.token, {
        //Expires after one week, time in secs
        maxAge: 604800,
      });
      notyf.success(`Welcome back, ${response.data.user.name}`)
      history.push(`/`)
    } catch(e) {
      notyf.error('Invalid credentials')
    }
  }

  return (
    <div className="container text-center mt-5 pt-5">
      <Formik
       initialValues={{ username: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.username) {
           errors.username = 'Username is required!';
         }
         if(!values.password){
          errors.password = 'Password is required!';
         }
         return errors;
       }}
       onSubmit={handleLogin}
     >
      <Form className="form-signin mt-4">
        <h4 className="h3 mb-3 font-weight-normal">Login</h4>
        <label className="sr-only">Username</label>
        <Field 
          type="text" 
          name="username" 
          autoComplete="off" 
          className="form-control my-1" 
          placeholder="Username"
        />
        <ErrorMessage name="username" >
        {
          msg => <div className="text-danger text-start">{msg}</div>
        }
        </ ErrorMessage>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <Field 
          type="password" 
          autoComplete="off" 
          name="password" 
          className="form-control"
          placeholder="Password"
        />
        <ErrorMessage name="password" >
        {
          msg => <div className="text-danger text-start">{msg}</div>
        }
        </ ErrorMessage>
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Submit
        </button>
        <p className="mt-5 mb-3 text-muted">© 2021</p>
      </Form>
     </Formik>
    </div>
  )
}

export default Login