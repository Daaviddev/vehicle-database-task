const generateColumnFieldsFromData = (data) => {
  try {
    // Check if data is not empty and is an array
    if (!Array.isArray(data)) {
      throw new Error('Input data is not an array');
    }

    if (data.length === 0) {
      // Return an empty array or consider throwing an error if empty data is not expected
      return [];
    }

    // Define the mandatory Id column
    const idColumn = {
      Header: 'Id',
      field: 'id',
    };

    // Generate columns using 'label' for Header and 'name' for field
    const columns = data.map((item) => {
      if (!item.label || !item.name) {
        throw new Error("Item missing 'label' or 'name' field");
      }
      return {
        Header: item.label,
        field: item.name,
      };
    });

    // Prepend the Id column to the list of columns
    return [idColumn, ...columns];
  } catch (error) {
    console.error('Error in generateColumnFieldsFromData:', error.message);
    throw error;
  }
};

export default generateColumnFieldsFromData;
