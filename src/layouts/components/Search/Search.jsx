import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import Button from 'src/components/Button';
import { CloseIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ProductItem from 'src/components/ProductItem';
import styles from './Search.module.css';
import { useDebounce } from 'src/hooks';

const mk = classNames.bind(styles);

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3, 4]);
    }, 0);
  }, []);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        placement="bottom-start"
        delay={[200, 400]}
        offset={[-12, 12]}
        render={(attrs) => (
          <div className="w-[400px]" tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className="py-1 px-3">Sản phẩm: 4</h4>
              <div className="flex flex-col divide-y-2">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={mk('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm kiếm"
            spellCheck="false"
            onChange={(event) => setSearchValue(event.target.value)}
            onFocus={() => setShowResult(true)}
            className={mk('input-search')}
          />

          {!!searchValue && (
            <Button icon wrapper={mk('clear')} onClick={handleClear}>
              <CloseIcon />
            </Button>
          )}

          {/* <Button icon wrapper={mk('loading')}>
            <LoadingIcon />
          </Button> */}

          <Button icon wrapper={mk('search-btn')}>
            <SearchIcon />
          </Button>
        </div>
      </HeadlessTippy>
    </div>
  );
}
