import React from 'react'
import arrowLeft from '../assets/left-arrow.svg'
import arrowRight from '../assets/right-arrow.svg'

const Pagination = ({ currentPage, changePage, totalPages }) => {
  const getVisiblePages = () => {
    // Start from at least page 1
    const totalVisiblePage = 3
    const offset = totalVisiblePage - 2
    let start = Math.max(currentPage - 1, 1)

    // Adjust start if we are close to the end
    if (start > totalPages - offset) {
      start = Math.max(totalPages - offset, 1)
    }

    // Calculate the end page based on the start
    let end = Math.min(start + offset, totalPages)

    // Create an array of page numbers to display
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }
  return (
    <nav>
      <ul className="flex justify-center items-center gap-3">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <img className="mt-2" src={arrowLeft} alt="arrow" />
          </button>
        </li>

        {getVisiblePages().map((number) => (
          <li key={number}>
            <button
              onClick={() => changePage(number)}
              className={`cursor-pointer p-2 ${
                currentPage === number ? 'font-bold' : ''
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            <img className="mt-2" src={arrowRight} alt="arrow" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
