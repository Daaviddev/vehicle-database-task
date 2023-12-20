import { useEffect } from 'react';

const useFormInitialization = (
  store,
  formConfig,
  id,
  isModel = false,
  additionalStore = undefined
) => {
  useEffect(() => {
    const initializeForm = async () => {
      try {
        if (!store || !formConfig) {
          throw new Error('Store or formConfig is undefined');
        }

        if (isModel) {
          if (store.models.length === 0) {
            await store.fetchModels();
          }
          if (
            additionalStore &&
            typeof additionalStore.getMakeNames === 'function'
          ) {
            await additionalStore.getMakeNames();
          }
        } else if (store.makes.length === 0) {
          await store.fetchMakes();
        }

        if (id) {
          const dataToEdit = (isModel ? store.models : store.makes).find(
            (item) => item.id === id
          );
          if (dataToEdit) {
            formConfig.update(dataToEdit);
          } else {
            throw new Error('Data to edit not found');
          }
        }

        if (isModel && additionalStore) {
          const makeField = formConfig.$('make');
          if (makeField) {
            makeField.set('extra', additionalStore.makeNames);
          } else {
            throw new Error("'make' field not found in form configuration");
          }
        }
      } catch (error) {
        console.error('Error in useFormInitialization:', error.message);
      }
    };

    initializeForm();
  }, [store, formConfig, id, isModel, additionalStore]);
};

export default useFormInitialization;
