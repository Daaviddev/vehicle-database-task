import { useEffect } from 'react';
import { observer } from 'mobx-react';

import FormFieldComponent from './FormFieldComponent';

import styles from './FormComponent.module.css';

const FormComponent = observer(({ form, onSubmit, id, name }) => {
  useEffect(() => {
    form.reset();
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Pass the entire form to the callback
  };

  const renderFields = () => {
    try {
      const fieldsArray = [];
      form.each((field) => {
        fieldsArray.push(<FormFieldComponent key={field.name} field={field} />);
      });
      return fieldsArray;
    } catch (error) {
      return 'Error rendering fields';
    }
  };

  return (
    <div className={styles.reusableFormCanvas}>
      <div className={styles.reusableFormHeaderCanvas}>
        <div className={styles.reusableFormHeaderWrapper}>
          <h2>{id ? `Edit ${id} ${name}` : `Create ${name}`}</h2>
        </div>
      </div>
      <div className={styles.reusableFormWrapper}>
        <form onSubmit={handleSubmit} name={name}>
          <div className={styles.reusableFormContainer}>{renderFields()}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
});

export default FormComponent;
