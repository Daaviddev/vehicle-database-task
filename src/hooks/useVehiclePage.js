import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import generateColumnFieldsFromData from '../utils/tableUtils';

const useVehiclePage = (store, constants, entityPath) => {
  useEffect(() => {
    if (entityPath === 'vehicle-makes') {
      store.fetchMakes();
    } else {
      store.fetchModels();
    }
  }, [store, entityPath]);

  const navigate = useNavigate();

  const columns = generateColumnFieldsFromData(constants);

  const handleCreateNew = () => {
    navigate(`/${entityPath}/create`);
  };

  const handleEdit = (id) => {
    navigate(`/${entityPath}/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (entityPath === 'vehicle-makes') {
      store.deleteVehicleMake(id);
    } else {
      store.deleteVehicleModel(id);
    }
  };

  const handleFilter = (filter) => {
    if (entityPath === 'vehicle-makes') {
      store.filterMakes(filter);
    } else {
      store.filterModels(filter);
    }
  };

  const handleSort = (field) => {
    if (entityPath === 'vehicle-makes') {
      store.sortMakes(field);
    } else {
      store.sortModels(field);
    }
  };

  const handlePaginationChange = (page) => {
    store.paginationChange(page);
  };

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
