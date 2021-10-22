const Pagination = ({onNext, onPrevious, next, previous}) => {
  return (
    <nav aria-label="Page navigation" className="my-2">
      <ul className="pagination justify-content-center">
        {
          previous ? (
            <li className="page-item">
              <a className="page-link styled-link" href="#" onClick={onPrevious}> Previous</a>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
          )
        }
        {
          next ? (
            <li className="page-item">
              <a className="page-link styled-link" href="#" onClick={onNext}>Next</a>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link">Next</a>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Pagination