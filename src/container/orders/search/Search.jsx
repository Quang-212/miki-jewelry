import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { CloseCircleIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';

import styles from './Search.module.css';

const mk = classNames.bind(styles);

export default function Search() {
  const handleClear = () => {
    console.log('clear');
  };

  return (
    <div className={mk('search')}>
      <input
        // ref={inputRef}
        // value={searchValue}
        // placeholder="Tìm kiếm"
        spellCheck="false"
        // onFocus={() => setShowResult(true)}
        className={mk('input-search')}
      />

      <SearchIcon className={mk('search-btn')} />

      {/* {!!searchValue && ( */}
      <Button icon wrapper={mk('clear')} onClick={handleClear}>
        <CloseCircleIcon />
      </Button>
      {/* )} */}

      <Button text wrapper={mk('search-text')}>
        Tìm đơn hàng
      </Button>
    </div>
  );
}
