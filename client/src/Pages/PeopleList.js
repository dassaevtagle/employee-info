import PersonCard from "../Components/PersonCard"

const PeopleList = ({persons, handleNext, handlePrevious}) => {
  return (
    
    <div className="container">
      {
        persons.results.map((person) => (
          <PersonCard
            key={person.subjectId}
            person={person}
          />
        ))
      }
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {
            persons.pagination.previous ? (
              <li className="page-item">
                <a className="page-link" href="#" onClick={handlePrevious}> Previous</a>
              </li>
            ) : (
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
            )
          }
          {
            persons.pagination.next ? (
              <li className="page-item">
                <a className="page-link" href="#" onClick={handleNext}>Next</a>
              </li>
            ) : (
              <li className="page-item disabled">
                <a className="page-link">Next</a>
              </li>
            )
          }
        </ul>
      </nav>
    </div>
  )
} 

export default PeopleList