import classNames from 'classnames/bind';
import { useRef } from 'react';

import Button from 'src/components/Button';
import { CloseCircleIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { useDebounce } from 'src/hooks';

import styles from './Search.module.css';

const mk = classNames.bind(styles);

export default function Search({ searchValue, onSearch }) {
  const inputRef = useRef();

  const handleChangeInput = (event) => {
    const searchValue = event.target.value;

    if (!searchValue.startsWith(' ')) {
      onSearch({ status: true, value: event.target.value });
    }
  };

  const handleClear = () => {
    onSearch({ status: false, value: '' });
    inputRef.current.focus();
  };

  return (
    <div className={mk('search')}>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={handleChangeInput}
        placeholder="Tìm kiếm đơn hàng theo Mã đơn hàng hoặc tên sản phẩm"
        spellCheck="false"
        className={mk('input-search')}
      />

      <SearchIcon className={mk('search-btn')} />

      {!!searchValue && (
        <Button icon wrapper={mk('clear')} onClick={handleClear}>
          <CloseCircleIcon />
        </Button>
      )}

      <Button text wrapper={mk('search-text')}>
        Tìm đơn hàng
      </Button>
    </div>
  );
}
