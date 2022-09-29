import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { CheckedInputIcon, UncheckedInputIcon } from 'src/components/Icons';

import { PATH } from 'src/routes';
import styles from './CheckBoxField.module.css';

const mk = classNames.bind(styles);

export function CheckBoxField({
  name,
  value,
  wrapper,
  input,
  label,
  caption,
  highlight,
  inputValue,
  onChange,
  multiple,
  ...other
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
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

  const highlightText = (string, target, className) => {
    return (
      <>
        {string.substring(0, string.indexOf(target))}
        <Link href={PATH.TERMS}>
          <a target="_blank" className={className}>
            {target}
          </a>
        </Link>
        {string.substring(string.indexOf(target))}
      </>
    );
  };

  const renderCheckbox = (multiple, name, inputValue) => {
    if (multiple) {
      return (
        <label htmlFor={value.id} className={classLabel}>
          {watch(name).join('') === inputValue ? <CheckedInputIcon /> : <UncheckedInputIcon />}
        </label>
      );
    }
    return (
      <label htmlFor={value.id} className={classLabel}>
        {watch(name) ? <CheckedInputIcon /> : <UncheckedInputIcon />}
      </label>
    );
  };

  return (
    <div className={classWrapper}>
      <input
        id={value.id}
        type="checkbox"
        value={inputValue}
        className={classInput}
        {...other}
        {...register(name, {
          ...(onChange && { onChange }),
        })}
      />
      {renderCheckbox(multiple, name, inputValue)}
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
