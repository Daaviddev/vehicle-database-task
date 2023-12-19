import { useState } from 'react';

import styles from './FilterComponent.module.css';

const FilterComponent = ({ onFilterApply }) => {
  const [filter, setFilter] = useState('');
  const [filterOperator, setFilterOperator] = useState('STARTS_WITH');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOperatorChange = (event) => {
    setFilterOperator(event.target.value);
  };

  const handleApplyFilter = () => {
    onFilterApply({
      value: filter.toLowerCase(),
      operator: filterOperator,
      field: 'name',
    });
  };

  const handleResetFilter = () => {
    setFilter('');
    setFilterOperator('STARTS_WITH');
    onFilterApply({
      value: '',
      operator: 'STARTS_WITH',
      field: 'name',
    });
  };

  return (
    <div className={styles.filterCanvas}>
      <div className={styles.filterWrapper}>
        <div className={styles.filterInputWrapper}>
          <div className={styles.filterFieldWrapper}>
            <span>Filter by Name</span>
            <div className={styles.filterFieldContainer}>
              <input
                type="text"
                name="filterInput"
                placeholder="Filter by Name..."
                value={filter}
                onChange={handleFilterChange}
              />
              <select name="filterOperator" onChange={handleOperatorChange}>
                <option value="STARTS_WITH">StartsWith</option>
                <option value="CONTAINS">Contains</option>
              </select>
            </div>
            <button type="submit" onClick={handleApplyFilter}>
              Apply Filter
            </button>
            <button
              className={styles.resetButton}
              type="button"
              onClick={handleResetFilter}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
