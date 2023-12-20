import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import generateColumnFieldsFromData from '../utils/tableUtils';

// Custom hook for managing vehicle page functionality
const useVehiclePage = (store, constants, entityPath) => {
  // useEffect to load data based on the entity path
  useEffect(() => {
    // Fetches either vehicle makes or models depending on the entity path
    if (entityPath === 'vehicle-makes') {
      store.fetchMakes();
    } else {
      store.fetchModels();
    }
  }, [store, entityPath]); // Dependencies for useEffect

  // Hook for programmatically navigating between routes
  const navigate = useNavigate();

  // Generate column fields for the table using utility function
  const columns = generateColumnFieldsFromData(constants);

  // Function to navigate to the creation page
  const handleCreateNew = () => {
    navigate(`/${entityPath}/create`);
  };

  // Function to navigate to the edit page with the specific ID
  const handleEdit = (id) => {
    navigate(`/${entityPath}/edit/${id}`);
  };

  // Function to handle the deletion of an entity (make or model)
  const handleDelete = (id) => {
    if (entityPath === 'vehicle-makes') {
      store.deleteVehicleMake(id);
    } else {
      store.deleteVehicleModel(id);
    }
  };

  // Function to filter entities (make or model) based on criteria
  const handleFilter = (filter) => {
    if (entityPath === 'vehicle-makes') {
      store.filterMakes(filter);
    } else {
      store.filterModels(filter);
    }
  };

  // Function to sort entities (make or model) based on a field
  const handleSort = (field) => {
    if (entityPath === 'vehicle-makes') {
      store.sortMakes(field);
    } else {
      store.sortModels(field);
    }
  };

  // Function to handle page changes in pagination
  const handlePaginationChange = (page) => {
    store.paginationChange(page);
  };

  // Return all handlers and column configuration
  return {
    columns,
    handleCreateNew,
    handleEdit,
    handleDelete,
    handleFilter,
    handleSort,
    handlePaginationChange,
  };
};

export default useVehiclePage;
