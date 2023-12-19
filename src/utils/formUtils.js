import { autorun } from 'mobx';
import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import showMessagePopup from './messagePopupUtils';

const plugins = {
  dvr: dvr(validatorjs),
};

const hooks = {
  onInit(form) {
    autorun(() => form.clearing && console.log('Clearing...'));
    autorun(() => form.resetting && console.log('Resetting...'));
    autorun(() => form.validating && console.log('Validating...'));
    autorun(() => form.submitting && console.log('Submitting...'));
  },
  onError() {
    showMessagePopup('Please check the form for errors.');
  },
};

export const generateFormConfig = (fieldConfigs) => {
  try {
    if (!Array.isArray(fieldConfigs)) {
      throw new Error('Field configurations must be an array');
    }

    const fields = fieldConfigs.reduce((acc, config) => {
      if (!config.name) {
        throw new Error("Field configuration missing 'name' property");
      }
      acc[config.name] = { ...config };
      return acc;
    }, {});

    return new MobxReactForm({ fields }, { plugins, hooks });
  } catch (error) {
    console.error('Error in generateFormConfig:', error.message);
    showMessagePopup('Error generating form configuration.');
    throw error;
  }
};

export const handleFormSubmit = async (
  form,
  store,
  id,
  navigate,
  navigatePath,
  isModel = false
) => {
  try {
    if (!form || typeof form.onSubmit !== 'function') {
      throw new Error('Invalid form object provided');
    }
    if (!store) {
      throw new Error('Store object is undefined');
    }

    form.onSubmit();

    if (form.isValid) {
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
      navigate(navigatePath);
    }
  } catch (error) {
    showMessagePopup('Something went wrong. Please try again.');
  }
};
