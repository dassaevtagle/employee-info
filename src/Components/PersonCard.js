import { Link } from 'react-router-dom'
import generatePdf from '../Helpers/pdfGenerator'
import '../Styles/PersonCard.scss'

const PersonCard = ({person}) => {
  return (
    <div className="container mt-3 d-flex justify-content-center">
        <div className="card px-3 py-1 shadow-lg">
            <div className="d-flex align-items-center">
                <div > 
                  <Link className="styled-link" to={`/profile/${person.username}`}>
                    <img src={person.picture} className="image" width="130"></ img>
                  </ Link> 
                </div>
                <div className="ml-3 w-100 p-3">
                    <h3 className="mb-0 mt-0"><Link className="styled-link" to={`/profile/${person.username}`}>{person.name}</Link></h3> <span className="professional-headline">{person.professionalHeadline}</span>
                    <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                        <div className="d-flex flex-column"> <span className="articles">Articles</span> <span className="number1">38</span> </div>
                        <div className="d-flex flex-column"> <span className="followers">Followers</span> <span className="number2">980</span> </div>
                        <div className="d-flex flex-column"> <span className="rating">Rating</span> <span className="number3">8.9</span> </div>
                    </div>
                    <div className="button mt-2 d-flex justify-content-end"> 
                      <button className="btn btn-sm btn-outline-primary">Chat</button> 
                      <button className="btn btn-sm btn-primary ml-2" onClick={() => generatePdf(person.username)}>Download CV</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PersonCard