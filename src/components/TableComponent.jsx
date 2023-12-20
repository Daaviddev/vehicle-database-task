import styles from './TableComponent.module.css';

const TableComponent = ({
  columns,
  data,
  pageSize,
  onEdit,
  onDelete,
  onSort,
}) => {
  // Default to an empty array if data is not provided
  const tableData = data || [];

  const emptyRowsCount = pageSize - tableData.length;

  const renderSortArrow = () => {
    return ' ↑ ↓';
  };

  return (
    <div className={styles.tableCanvas}>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeadingWrapper}>
          <div className={styles.tableHeadingContainer}>
            <span>Vehicle Table Data</span>
          </div>
        </div>
        <hr />
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => {
                const key = `header-${col.field}`;
                return (
                  <th key={key} onClick={() => onSort(col.field)}>
                    <div className={styles.tableHeaderTextWrapper}>
                      <span> {col.Header}</span>
                      <span className={styles.tableHeaderTextWrapperOder}>
                        {renderSortArrow(col.field)}
                      </span>
                    </div>
                  </th>
                );
              })}

              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.field}>{item[col.field]}</td>
                  ))}
                  <td className={styles.tableButtonCell}>
                    <button
                      type="button"
                      className={styles.tableButtonEdit}
                      onClick={() => onEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className={styles.tableButtonCell}>
                    <button
                      type="button"
                      className={styles.tableButtonDelete}
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2}>No data available</td>
              </tr>
            )}
            {emptyRowsCount > 0 &&
              Array.from({ length: emptyRowsCount }, (_, i) => i).map(
                (index) => (
                  <tr key={`empty-${index}`}>
                    {columns.map((col) => (
                      <td key={`empty-col-${col.field}`} aria-label="Edit" />
                    ))}
                    <td aria-label="Edit">-</td>
                    <td aria-label="Edit">-</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
