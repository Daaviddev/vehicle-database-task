import { useNavigate, useParams } from 'react-router-dom';

import VehicleMakeStore from '../stores/VehicleMakeStore';
import FormComponent from '../components/FormComponent';
import VehicleMakeConst from '../constants/vehicleMakeConst';
import useFormInitialization from '../hooks/useFormInitialization';
import { generateFormConfig, handleFormSubmit } from '../utils/formUtils';

import styles from './VehicleViews.module.css';

const VehicleMakeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Generating form configuration based on constants
  const formConfig = generateFormConfig(VehicleMakeConst);

  // Effect to initialize form with data for editing
  useFormInitialization(VehicleMakeStore, formConfig, id, false);

  // Handling form submission
  const onSubmit = async (form) => {
    await handleFormSubmit(
      form,
      VehicleMakeStore,
      id,
      navigate,
      '/vehicle-makes'
    );
  };

  return (
    <div className={styles.pageCanvas}>
      <div className={styles.pageHeaderWrapper}>
        <h2>{id ? 'Edit' : 'Create'} Vehicle Make</h2>
      </div>
      <div className={styles.componentsWrapper}>
        <FormComponent
          form={formConfig}
          onSubmit={onSubmit}
          id={id}
          name="Vehicle Make"
        />
      </div>
    </div>
  );
};

export default VehicleMakeForm;
