import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import styles from './TextField.module.css';

const mk = classNames.bind(styles);

export function TextField({ name, label, placeholder, wrapper, input, caption, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classInput = mk('input', {
    [input]: input,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={classInput}
        {...other}
        {...register(name)}
      />
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
