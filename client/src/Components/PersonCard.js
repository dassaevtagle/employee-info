import { Fragment } from 'react-is';
import { Link } from 'react-router-dom'
import generatePdf from '../Helpers/pdfGenerator'
import '../Styles/PersonCard.scss'
import HttpService from '../Services/HttpService';
import { AuthContext } from '../Services/AuthContext'
import { useContext } from 'react'

const calculateProgress = (weight) => {
  return (weight * 100 / 25000) + "%"
}

const PersonCard = ({person}) => {
  const addToFavorite = HttpService().addToFavorite
  const { isAuth } = useContext(AuthContext)
  
  const toggleHeart =  (id) => {
    let button = document.querySelector(`#heart-${id}`)
    button.style.opacity === "" ? button.style.opacity = 0.5 : button.style.opacity = ""
  }

  const addFavorite = async (person) => {
    try {
      toggleHeart(person.subjectId)
      await addToFavorite(person)
    } catch(e) {
    }
  }

  return (
    <Fragment>

    <div className="container mt-3 d-flex justify-content-center">
        <div className="card px-3 shadow-lg">
            <div className="d-flex align-items-center">
                <div > 
                  <Link className="styled-link" to={`/profile/${person.username}`}>
                    <img src={person.picture} alt={`Person face`} className="image" width="130"></ img>
                  </ Link> 
                </div>
                <div className="ml-3 w-100 p-3">
                    <div className="row">
                      <div className="col-11 px-0">
                        <h4 className="mb-0 mt-0">
                          <Link className="styled-link" to={`/profile/${person.username}`}>
                            {person.name}
                          </Link>
                        </h4> 
                      </div>
                      {
                        /* isAuth ? (
                          <div className="col-1 p-0">
                            <a 
                              title="Love it" 
                              className="styled-link" 
                              id={`heart-${person.subjectId}`} 
                              onClick={() => addFavorite(person)}
                            >
                              <span>&#x2764;</span>
                            </a>
                          </div>
                        ) : <></> */
                      }
                    </div>
                    <span className="professional-headline">
                        {person.professionalHeadline}
                    </span>
                    <div className="ms-4">
                      <div>
                        <small 
                          className="text-sm text-muted mx-2" 
                          style={{fontSize: "12px"}}
                        >
                          Weight
                        </small>
                      </div>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{width: calculateProgress(person.weight)}} 
                          aria-valuemin="0" 
                          aria-valuemax="25000"
                        ></div>
                      </div>  
                    </div>
                    <div className="button mt-2 d-flex justify-content-end"> 
                    {
                      person.remoter ? (
                        <div className="me-auto ms-1 my-auto badge bg-dark" style={{fontSize: "10px"}}>
                          Remoter &nbsp; <i className="fas fa-globe-americas"></i>
                        </div>
                      ) : (<></>)
                    }
                    {    
                      isAuth ? (
                        <a 
                          className="btn btn-outline-primary mx-1 styled-link text-dark" 
                          target="_blank" 
                          rel="noreferrer"
                          href={`https://torre.co/es/messenger/conversations/${person.subjectId}`}
                          >
                          Message
                        </a>
                      ) : (<></>)
                    }
                      <button 
                        className="btn btn-sm btn-primary ml-2 text-white" 
                        onClick={() => generatePdf(person.username)}
                        
                      >
                        Download CV
                      </button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
    )
}

export default PersonCard