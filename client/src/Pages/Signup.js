import '../Styles/Signup.scss'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useCookies } from 'react-cookie'
import HttpService from '../Services/HttpService'

const Signup = () => {
  const signup = HttpService().signup
  const [cookies, setCookie] = useCookies(['t']);

  let history = useHistory()
  const handleSignup = async (values) => {
    try{
      let response = await signup(values)
      setCookie('t', response.data.token, {
        //Expires after one week, time in secs
        maxAge: 604800,
      });
      history.push(`/`)
    } catch(e) {
      console.log(JSON.stringify(e))
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
       onSubmit={handleSignup}
     >
      <Form className="form-signin mt-4">
        <h4 className="h3 mb-3 font-weight-normal">Sign up</h4>
        <p className="text-muted text-sm">with your username at Torre.co</p>
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

export default Signup