import { observer } from 'mobx-react';

import VehicleModelStore from '../stores/VehicleModelStore';
import VehicleModelConst from '../constants/vehicleModelConst';
import useVehiclePage from '../hooks/useVehiclePage';
import CommonVehiclePageLayout from '../components/CommonVehiclePageLayout';

const VehicleModelPage = observer(() => {
  const {
    columns,
    handleCreateNew,
    handleEdit,
    handleDelete,
    handleSort,
    handleFilter,
    handlePaginationChange,
  } = useVehiclePage(VehicleModelStore, VehicleModelConst, 'vehicle-models');

  return (
    <CommonVehiclePageLayout
      title="Vehicle Models"
      store={VehicleModelStore}
      entityPath="vehicle-models"
      columns={columns}
      onCreateNew={handleCreateNew}
      onEdit={handleEdit}
      onDelete={handleDelete}
      handlePaginationChange={handlePaginationChange}
      handleFilter={handleFilter}
      handleSort={handleSort}
    />
  );
});

export default VehicleModelPage;
