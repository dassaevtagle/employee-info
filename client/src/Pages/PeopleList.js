import PersonCard from "../Components/PersonCard"
import Pagination from "../Components/Pagination"
import { Fragment } from "react"

const PeopleList = ({persons, handleNext, handlePrevious}) => {
  return (
    <div className="container">

      <Pagination
        onNext={handleNext}
        onPrevious={handlePrevious}
        next={persons.pagination.next}
        previous={persons.pagination.previous}
      />

      {
        persons.results.map((person) => (
          <PersonCard
          key={person.subjectId}
          person={person}
          />
          ))
        }

      <Pagination
        onNext={handleNext}
        onPrevious={handlePrevious}
        next={persons.pagination.next}
        previous={persons.pagination.previous}
        />
    </div>
  )
} 

export default PeopleList