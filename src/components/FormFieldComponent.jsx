import { observer } from 'mobx-react';

import styles from './FormFieldComponent.module.css';

// src/components/reusable/FormField.jsx
const FormFieldComponent = observer(({ field }) => {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return <input id={field.id} name={field.name} {...field.bind()} />;

      case 'select': {
        const options = field.extra || [];
        return (
          <select id={field.id} name={field.name} {...field.bind()}>
            <option value="">Choose Vehicle Make</option>
            {options.map((option) => (
              <option key={option.name} value={JSON.stringify(option)}>
                {option.name}
              </option>
            ))}
          </select>
        );
      }

      default:
        throw new Error(`Unknown type: ${field.type}`);
    }
  };

  return (
    <div className={styles.fieldCanvas}>
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldContainer}>
          <label htmlFor={field.id}>{field.label}</label>
          <div className={styles.fieldInputWrapper}>{renderInput()}</div>
        </div>
        {field.error ? <small>{field.error}</small> : <small />}
      </div>
    </div>
  );
});

export default FormFieldComponent;
