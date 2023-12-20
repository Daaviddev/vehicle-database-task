import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import FormComponent from '../components/FormComponent';
import VehicleModelStore from '../stores/VehicleModelStore';
import VehicleModelConst from '../constants/vehicleModelConst';
import VehicleMakeStore from '../stores/VehicleMakeStore';
import useFormInitialization from '../hooks/useFormInitialization';
import { generateFormConfig, handleFormSubmit } from '../utils/formUtils';

import styles from './VehicleViews.module.css';

const VehicleModelForm = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Generating form configuration based on constants
  const formConfig = generateFormConfig(VehicleModelConst);

  // Effect to initialize form with data for editing
  useFormInitialization(
    VehicleModelStore,
    formConfig,
    id,
    true,
    VehicleMakeStore
  );

  // Handling form submission
  const onSubmit = async (form) => {
    await handleFormSubmit(
      form,
      VehicleModelStore,
      id,
      navigate,
      '/vehicle-models',
      true
    );
  };

  return (
    <div className={styles.pageCanvas}>
      <div className={styles.pageHeaderWrapper}>
        <h2>{id ? 'Edit' : 'Create'} Vehicle Model</h2>
      </div>
      <div className={styles.componentsWrapper}>
        <FormComponent
          form={formConfig}
          onSubmit={onSubmit}
          id={id}
          name="Vehicle Model"
        />
      </div>
    </div>
  );
});

export default VehicleModelForm;
