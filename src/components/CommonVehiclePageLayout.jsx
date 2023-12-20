import React from 'react';
import { observer } from 'mobx-react';
import ButtonComponent from './ButtonComponent';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';
import PaginationComponent from './PaginationComponent';

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
      <div className="page-canvas">
        <div className="view-header-div">
          <h2>{title}</h2>
          <ButtonComponent onClick={onCreateNew} />
        </div>
        <div className="components-wrapper">
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
