import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';
import accessNestedObject from 'src/utils/accessNestedObject';

import styles from './TextAreaField.module.css';

const mk = classNames.bind(styles);

export default function TextAreaField({
  name,
  label,
  rows,
  cols,
  placeholder,
  wrapper,
  input,
  caption,
  onChange,
  ...other
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classLabel = mk('root', 'subtitle-1', {});

  const classInput = mk('input', {
    [input]: input,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      <label htmlFor={name} className={classLabel}>
        {label}
      </label>
      <textarea
        type="text"
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className={classInput}
        style={{
          ...(errors?.[name] && {
            borderColor: 'red',
            backgroundColor: '#ffebeb',
          }),
        }}
        {...other}
        {...register(name)}
      />
      <span className={classCaption}>{errors?.message}</span>
    </div>
  );
}
