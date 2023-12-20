import styles from './Pagination.module.css';

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange({ currentPage: currentPage - 1, pageSize: pageSize });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange({ currentPage: currentPage + 1, pageSize: pageSize });
    }
  };
  const handlePageSizeChange = (event) => {
    const newPageSize = Number(event.target.value);
    onPageSizeChange({
      pageSize: newPageSize,
      currentPage: currentPage,
    });
  };

  return (
    <div className={styles.paginationCanvas}>
      <div className={styles.paginationWrapper}>
        <div className={styles.paginationPagesizeWrapper}>
          <span>Page Size: </span>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className={styles.paginationPageWrapper}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
