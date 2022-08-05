import classNames from 'classnames/bind';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import { PATH } from 'src/routes/path';
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
        <Link href={PATH.terms}>
          <a target="_blank" className={className}>
            {target}
          </a>
        </Link>
        {string.substring(string.indexOf(target))}
      </>
    );
  };

  return (
    <div className={classWrapper}>
      <input
        id={value.id}
        type="checkbox"
        checked={watch(name)}
        className={classInput}
        {...other}
        {...register(name)}
      />
      <label htmlFor={value.id} className={classLabel}>
        {value.highlight
          ? highlightText(value.content, value.highlightText, highlight)
          : value.content}
      </label>
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
