import { useFormContext } from 'react-hook-form';
import classNames from 'classnames/bind';

import styles from './RadioField.module.css';

const mk = classNames.bind(styles);

export function RadioField({
  name,
  option,
  value,
  wrapper,
  subWrapper,
  input,
  label,
  caption,
  ...other
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classSubWrapper = mk('root', {
    [subWrapper]: subWrapper,
  });

  const classInput = mk('input', {
    [input]: input,
  });

  const classLabel = mk('label', {
    [label]: label,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      {option.map((value, index) => (
        <div key={index} className={classSubWrapper}>
          <input id={value.id} type="radio" className={classInput} {...other} {...register(name)} />
          <label htmlFor={value.id} className={classLabel}>
            {value.content}
          </label>
        </div>
      ))}
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}