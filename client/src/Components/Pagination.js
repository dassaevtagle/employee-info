const Pagination = ({onNext, onPrevious, next, previous}) => {
  return (
    <nav aria-label="Page navigation" className="my-2">
      <ul className="pagination justify-content-center">
        {
          previous ? (
            <li className="page-item">
              <a className="page-link styled-link" href="#" onClick={onPrevious}><i className="fas fa-arrow-left"></i></a>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link"><i className="fas fa-arrow-left"></i></a>
            </li>
          )
        }
        {
          next ? (
            <li className="page-item">
              <a className="page-link styled-link" href="#" onClick={onNext}><i className="fas fa-arrow-right"></i></a>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link"><i className="fas fa-arrow-right"></i></a>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Pagination