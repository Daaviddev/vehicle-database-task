function createQuery(data) {
  try {
    // Check if necessary data fields are present
    if (
      !data.pagination ||
      !data.filters ||
      !data.sortField ||
      !data.sortOrder
    ) {
      throw new Error('Missing required fields in data object');
    }

    // Constructing the query object
    return {
      pageSize: data.pagination.pageSize,
      pageToken: data.pagination.pageToken,
      structuredQuery: {
        where: {
          fieldFilter: {
            field: {
              fieldPath: data.filters.field,
            },
            op: data.filters.operator,
            value: {
              stringValue: data.filters.value,
            },
          },
        },
        orderBy: [
          {
            field: {
              fieldPath: data.sortField,
            },
            direction: data.sortOrder,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error creating query: ', error.message);
    throw error;
  }
}

export default createQuery;
