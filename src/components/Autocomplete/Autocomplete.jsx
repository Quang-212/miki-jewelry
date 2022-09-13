import classNames from 'classnames/bind';
import { isEmpty, isPlainObject } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import accessNestedObject from 'src/utils/accessNestedObject';
import { formatSearchString } from 'src/utils/formatString';
import List from '../List';
import ListItemButton from '../ListItemButton';

import styles from './Autocomplete.module.css';

const mk = classNames.bind(styles);

export default function Autocomplete({
  name,
  options = [],
  getOption,
  onSelectValue,
  className,
  caption,
  input,
  disable,
  placeholder,
  ...other
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectRef = useRef();

  const handleFocus = () => {
    setOpen(true);
  };

  const handleBlur = (event) => {
    if (!selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  function getKeyByValue() {
    if (!isPlainObject(options[0]) && !isEmpty(getOption)) {
      return '';
    }
    const value = getOption(options[0]);
    const object = options[0];
    return Object.keys(object).find((key) => object[key] === value);
  }

  const filterLabel = isEmpty(query)
    ? options
    : options.filter((option) => {
        const key = getKeyByValue();
        return formatSearchString([key ? option[key] : option]).includes(
          query.toLowerCase().replace(/\s+/g, ''),
        );
      });

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleSelect = (item) => {
    console.log(item);
  };

  useEffect(() => {
    setQuery(watch(name));
  }, [watch(name)]);

  useEffect(() => {
    document.addEventListener('click', handleBlur);
    return () => {
      document.removeEventListener('click', handleBlur);
    };
  });

  const handleClick = (item) => {
    isEmpty(onSelectValue) ? onSelectValue(item) : handleSelect(item);
    setOpen(false);
  };

  const classRoot = mk('root', {
    [className]: className,
  });

  const classCaption = mk('caption', {
    [caption]: caption,
  });

  const classInput = mk('input', {
    [input]: input,
    disable,
  });

  return (
    <div className={classRoot} ref={selectRef} {...other}>
      <input
        className={classInput}
        placeholder={placeholder}
        {...register(name)}
        onFocus={handleFocus}
      />

      <span className={classCaption}>{accessNestedObject(errors, name)?.message}</span>
      {open && (
        <div className={mk('option')}>
          <List className="px-0 pb-2 w-fit">
            {filterLabel.map((item, index) => {
              const key = getKeyByValue();
              return (
                <ListItemButton
                  onClick={() => handleClick(item)}
                  key={index}
                  className="rounded-none whitespace-pre"
                >
                  {key ? item[key] : item}
                </ListItemButton>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
}
