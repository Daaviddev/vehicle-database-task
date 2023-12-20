import React from 'react';
import { observer } from 'mobx-react';

import ButtonComponent from './ButtonComponent';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';
import PaginationComponent from './PaginationComponent';

import styles from '../pages/VehicleViews.module.css';

const CommonVehiclePageLayout = observer(
  ({
    title,
    store,
    entityPath,
    columns,
    onCreateNew,
    onEdit,
    onDelete,
    handleSort,
    handlePaginationChange,
    handleFilter,
  }) => {
    const data = entityPath === 'vehicle-makes' ? store.makes : store.models;

    return (
      <div className={styles.pageCanvas}>
        <div className={styles.pageHeaderWrapper}>
          <h2>{title}</h2>
          <ButtonComponent onClick={onCreateNew} />
        </div>
        <div className={styles.componentsWrapper}>
          <FilterComponent onFilterApply={handleFilter} />
          <TableComponent
            columns={columns}
            data={data}
            pageSize={store.paginate.pageSize}
            onEdit={onEdit}
            onDelete={onDelete}
            onSort={handleSort}
          />
          <PaginationComponent
            currentPage={store.paginate.currentPage}
            totalPages={store.paginate.totalPages}
            pageSize={store.paginate.pageSize}
            onPageChange={handlePaginationChange}
            onPageSizeChange={handlePaginationChange}
          />
        </div>
      </div>
    );
  }
);

export default CommonVehiclePageLayout;
