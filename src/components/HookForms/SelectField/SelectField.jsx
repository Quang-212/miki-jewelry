import { useFormContext } from 'react-hook-form';
import classNames from 'classnames/bind';

import styles from './SelectField.module.css';

const mk = classNames.bind(styles);

export function SelectField({ name, label, options, wrapper, select, caption, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classLabel = mk('label', {
    [label]: label,
  });

  const classSelect = mk('select', {
    [select]: select,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      <label htmlFor={name} className={classLabel}>
        {label}
      </label>
      <select className={classSelect} {...other} {...register(name)}>
        {options.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
