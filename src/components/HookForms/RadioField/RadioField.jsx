import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { CircleCheckedInputIcon, CircleUncheckInputIcon } from 'src/components/Icons';
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

  const classLabel = mk('label', {
    [label]: label,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });
  console.log(watch(name));

  return (
    <div className={classWrapper}>
      {options.map((value, index) => {
        const checkedInput = value.id === watch(name);
        return (
          <div key={index} className={classSubWrapper}>
            <input
              id={value.id}
              type="radio"
              value={value.id}
              checked={checkedInput}
              onChange={(event) => setValue(name, event.target.value)}
              className={classInput}
              {...other}
            />
            <label htmlFor={value.id} className={classLabel}>
              {checkedInput ? <CircleCheckedInputIcon /> : <CircleUncheckInputIcon />}
              {value.content}
            </label>
          </div>
        );
      })}
      <span className={classCaption}>{errors[name]?.message}</span>
    </div>
  );
}
