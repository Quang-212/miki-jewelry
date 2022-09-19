import { useFormContext } from 'react-hook-form';
import classNames from 'classnames/bind';

import styles from './RadioField.module.css';

const mk = classNames.bind(styles);

export function RadioField({
  name,
  options,
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
    watch,
    setValue,
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

  const classLabel = mk('label', 'subtitle-2', {
    [label]: label,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      {options.map((value, index) => (
        <div key={index} className={classSubWrapper}>
          <input
            // id={value.id}
            type="radio"
            value={value.id}
            checked={value.id === watch(name)}
            onChange={(event) => setValue(name, event.target.value)}
            className={classInput}
            {...other}
            // {...register(name)}
          />
          <label htmlFor={value.id} className={classLabel}>
            {value.content}
          </label>
        </div>
      ))}
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
