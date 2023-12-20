import { observer } from 'mobx-react';

import VehicleMakeStore from '../stores/VehicleMakeStore';
import VehicleMakeConst from '../constants/vehicleMakeConst';
import CommonVehiclePageLayout from '../components/CommonVehiclePageLayout';
import useVehiclePage from '../hooks/useVehiclePage';

const VehicleMakePage = observer(() => {
  const {
    columns,
    handleCreateNew,
    handleEdit,
    handleDelete,
    handlePaginationChange,
    handleFilter,
    handleSort,
  } = useVehiclePage(VehicleMakeStore, VehicleMakeConst, 'vehicle-makes');

  return (
    <CommonVehiclePageLayout
      title="Vehicle Makes"
      store={VehicleMakeStore}
      entityPath="vehicle-makes"
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

export default VehicleMakePage;
