import { autorun } from 'mobx';
import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import showMessagePopup from './messagePopupUtils';

// Setup for the form validation plugins
const plugins = {
  dvr: dvr(validatorjs),
};

// Hooks for form lifecycle events
const hooks = {
  // Initialize autorun side-effects for form states
  onInit(form) {
    autorun(() => form.clearing && console.log('Clearing...'));
    autorun(() => form.resetting && console.log('Resetting...'));
    autorun(() => form.validating && console.log('Validating...'));
    autorun(() => form.submitting && console.log('Submitting...'));
  },
  // Error handler to show a popup message when there's a form error
  onError() {
    showMessagePopup('Please check the form for errors.');
  },
};

// Function to generate form configuration based on field configurations
export const generateFormConfig = (fieldConfigs) => {
  try {
    // Ensure the provided fieldConfigs is an array
    if (!Array.isArray(fieldConfigs)) {
      throw new Error('Field configurations must be an array');
    }

    // Process field configurations to create form fields
    const fields = fieldConfigs.reduce((acc, config) => {
      // Validate if each field configuration has a 'name' property
      if (!config.name) {
        throw new Error("Field configuration missing 'name' property");
      }
      acc[config.name] = { ...config };
      return acc;
    }, {});

    // Return a new MobxReactForm instance with fields, plugins, and hooks
    return new MobxReactForm({ fields }, { plugins, hooks });
  } catch (error) {
    // Handle any errors during form configuration generation
    console.error('Error in generateFormConfig:', error.message);
    showMessagePopup('Error generating form configuration.');
    throw error;
  }
};

// Function to handle form submission logic
export const handleFormSubmit = async (
  form,
  store,
  id,
  navigate,
  navigatePath,
  isModel = false
) => {
  try {
    // Validate the form and store objects
    if (!form || typeof form.onSubmit !== 'function') {
      throw new Error('Invalid form object provided');
    }
    if (!store) {
      throw new Error('Store object is undefined');
    }

    // Trigger form submission
    form.onSubmit();

    // Process form submission if the form is valid
    if (form.isValid) {
      // Update or add vehicle model/make based on provided ID
      if (id) {
        if (isModel) {
          await store.updateVehicleModel(id, form.values());
        } else {
          await store.updateVehicleMake(id, form.values());
        }
      } else {
        console.log('Form values:', form.values());
        if (isModel) {
          console.log('Adding model');
          await store.addVehicleModel(form.values());
        } else {
          await store.addVehicleMake(form.values());
        }
      }
      // Navigate to a specified path after form processing
      navigate(navigatePath);
    }
  } catch (error) {
    // Handle any errors during form submission
    showMessagePopup('Something went wrong. Please try again.');
  }
};
