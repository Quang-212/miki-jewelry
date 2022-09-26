import classNames from 'classnames/bind';
import { useState } from 'react';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from 'src/components/Button';
import { ViewHideIcon, ViewIcon } from 'src/components/Icons';

import accessNestedObject from 'src/utils/accessNestedObject';

import styles from './TextField.module.css';

const mk = classNames.bind(styles);

export function TextField({
  name,
  label,
  password,
  placeholder,
  wrapper,
  input,
  viewIcon,
  caption,
  onChange,
  ...other
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classLabel = mk('label', 'subtitle-1', {});

  const classInput = password
    ? mk('input', 'pr-14', {
        [input]: input,
      })
    : mk('input', 'pr-4', {
        [input]: input,
      });

  const classViewIcon = mk('view-icon', {
    [viewIcon]: viewIcon,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  return (
    <div className={classWrapper}>
      {label && (
        <label htmlFor={name} className={classLabel}>
          {label}
        </label>
      )}
      <input
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
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
      {password && (
        <Button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          wrapper={classViewIcon}
        >
          {showPassword ? <ViewIcon /> : <ViewHideIcon />}
        </Button>
      )}
      <span className={classCaption}>{accessNestedObject(errors, name)?.message}</span>
    </div>
  );
}
