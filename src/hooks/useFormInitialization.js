import { useEffect } from 'react';

// Custom hook for initializing forms with data from a store
const useFormInitialization = (
  store,
  formConfig,
  id,
  isModel = false,
  additionalStore = undefined
) => {
  // useEffect to handle the lifecycle of the form initialization
  useEffect(() => {
    // Async function to initialize the form
    const initializeForm = async () => {
      try {
        // Validate if store and formConfig objects are provided
        if (!store || !formConfig) {
          throw new Error('Store or formConfig is undefined');
        }

        // Fetch models or makes if necessary
        if (isModel) {
          if (store.models.length === 0) {
            await store.fetchModels();
          }
          // Fetch additional data for models if an additionalStore is provided
          if (
            additionalStore &&
            typeof additionalStore.getMakeNames === 'function'
          ) {
            await additionalStore.getMakeNames();
          }
        } else if (store.makes.length === 0) {
          await store.fetchMakes();
        }

        // Populate the form with existing data if an ID is provided
        if (id) {
          const dataToEdit = (isModel ? store.models : store.makes).find(
            (item) => item.id === id
          );
          if (dataToEdit) {
            formConfig.update(dataToEdit);
            if (isModel) {
              const makeField = formConfig.$('make');
              if (makeField) {
                makeField.set('extra', additionalStore.makeNames);
                const selectedMake = additionalStore.makeNames.find(
                  (item) =>
                    item.name.toLowerCase() ===
                    dataToEdit.makeDisplay.toLowerCase()
                );
                makeField.set('value', selectedMake ? selectedMake.id : ''); // Ensure selectedMake.id is a string or number
              }
            }
          } else {
            throw new Error('Data to edit not found');
          }
        }

        // Update form configuration for models if necessary
        if (isModel && additionalStore && !id) {
          const makeField = formConfig.$('make');
          if (makeField) {
            makeField.set('extra', additionalStore.makeNames);
          } else {
            throw new Error("'make' field not found in form configuration");
          }
        }
      } catch (error) {
        // Handle any errors that occur during form initialization
        console.error('Error in useFormInitialization:', error.message);
      }
    };

    // Call the initializeForm function
    initializeForm();
  }, [store, formConfig, id, isModel, additionalStore]); // Dependencies for useEffect
};

export default useFormInitialization;
