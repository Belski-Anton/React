'use client'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import './style.css'
import { changePage } from '../../../store/dataForApi/dataForApiSlice'
import { useCallback, useEffect } from 'react'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const { page, totalPage } = useAppSelector((state) => state.dataForApiSlice)
  const { isLoadingData } = useAppSelector((state) => state.load)
  const generatePageNumbers = useCallback(() => {
    const pageNumbers = []
    for (let i = 1; i <= Math.min(9, totalPage); i++) {
      pageNumbers.push(`${i}`)
    }
    return pageNumbers
  }, [totalPage])


  return (
    <div className="pagination">
      {!!(totalPage && !isLoadingData) && generatePageNumbers().map((pageNumber) => (
        <span
          data-testid="btn-page"
          onClick={() => dispatch(changePage(pageNumber))}
          key={pageNumber}
          className={`numberPage ${pageNumber === page ? 'activePage' : ''
            }`}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  )
}

export default Pagination