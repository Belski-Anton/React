import './Pagination.css'
interface PropsPagination {
    totalPage: number
    currentPage: number
    changePage: (n: number) => void
}

const Pagination = ({
    totalPage,
    currentPage,
    changePage,
}: PropsPagination) => {
    const generatePageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= Math.min(9, totalPage); i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }
    return (
        <div className="pagination">
            {generatePageNumbers().map((pageNumber) => (
                <span
                    onClick={() => changePage(pageNumber)}
                    key={pageNumber}
                    className={`numberPage ${
                        pageNumber === currentPage ? 'activePage' : ''
                    }`}
                    data-testid="page-number"
                >
                    {pageNumber}
                </span>
            ))}
        </div>
    )
}

export default Pagination
