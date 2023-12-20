// Disabling Eslint Rule for no-param-reassign
// Rule Throws error - Assignment to property of function parameter 'store'. eslint
// his is a pragmatic approach when the mutation aligns with the library's intended usage.

/* eslint-disable no-param-reassign */

import { runInAction } from 'mobx';

// Reset sorting parameters to default
export function resetSorting(store) {
  try {
    if (!store) throw new Error('Store object is undefined');

    runInAction(() => {
      store.sortField = 'name';
      store.sortOrder = 'ASCENDING';
    });
  } catch (error) {
    console.error('Error in resetSorting:', error.message);
    throw error;
  }
}

// Update pagination details based on fetched data
export function updatePaginationState(store, fetchedData) {
  try {
    if (!store) throw new Error('Store object is undefined');
    if (!fetchedData) throw new Error('Fetched data is undefined');

    runInAction(() => {
      store.paginate.totalPages = fetchedData.totalPages;
      store.paginate.currentPage = fetchedData.currentPage;
      store.paginate.previousPageToken = fetchedData.previousPageToken;
      store.paginate.nextPageToken = fetchedData.nextPageToken;
    });
  } catch (error) {
    console.error('Error in updatePaginationState:', error.message);
    throw error;
  }
}

// Update pagination configuration based on UI interaction
export function updatePaginationConfig(store, paginationProps) {
  try {
    if (!store || !store.paginate)
      throw new Error('Invalid or undefined store object');
    if (!paginationProps)
      throw new Error('Pagination properties are undefined');

    runInAction(() => {
      if (paginationProps.pageSize !== store.pagination.pageSize) {
        store.paginate.pageSize = paginationProps.pageSize;
        store.pagination.pageSize = paginationProps.pageSize;
        store.pagination.pageToken = '';
      }

      if (paginationProps.currentPage !== store.paginate.currentPage) {
        store.pagination.pageToken =
          store.paginate.currentPage > paginationProps.currentPage
            ? store.paginate.previousPageToken
            : store.paginate.nextPageToken;
      } else {
        store.pagination.pageToken = '';
      }
    });
  } catch (error) {
    console.error('Error in updatePaginationConfig:', error.message);
    throw error;
  }
}
