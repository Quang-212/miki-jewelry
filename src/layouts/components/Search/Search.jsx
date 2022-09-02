import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import Button from 'src/components/Button';
import { CloseIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ProductItem from 'src/components/ProductItem';
import styles from './Search.module.css';
import { useDebounce, useProducts } from 'src/hooks';

const mk = classNames.bind(styles);

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef();

  const debouncedValue = useDebounce(searchValue, 600);

  const { productsState, isLoading, isError } = useProducts({
    search: encodeURIComponent(debouncedValue),
    select: {
      _id: 1,
      images: 1,
      name: 1,
      slug: 1,
      stocks: 1,
    },
  });
  const products = productsState?.productList;

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    setSearchResult(products);
  }, [debouncedValue, products]);

  const renderResult = (attrs) => {
    return (
      <div className="w-[430px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className="gap-1">
          <h4 className="py-1 px-3">Sản phẩm: {searchResult?.length}</h4>
          <ul className="flex flex-col gap-2">
            {searchResult?.map((result) => (
              <ProductItem key={result._id} data={result} />
            ))}
          </ul>
        </PopperWrapper>
      </div>
    );
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChangeInput = (event) => {
    const searchValue = event.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  if (isError) return <h2>{isError}</h2>;

  return (
    // Using a wrapper <div> tag around the reference element
    // solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        visible={showResult && searchResult?.length > 0}
        interactive
        placement="bottom-start"
        delay={[200, 400]}
        offset={[-12, 12]}
        render={renderResult}
        onClickOutside={handleHideResult}
      >
        <div className={mk('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm kiếm"
            spellCheck="false"
            onChange={handleChangeInput}
            onFocus={() => setShowResult(true)}
            className={mk('input-search')}
          />

          {!!searchValue && !isLoading && (
            <Button icon wrapper={mk('clear')} onClick={handleClear}>
              <CloseIcon />
            </Button>
          )}

          {isLoading && (
            <Button icon wrapper={mk('loading')}>
              <LoadingIcon />
            </Button>
          )}

          <Button icon wrapper={mk('search-btn')}>
            <SearchIcon />
          </Button>
        </div>
      </HeadlessTippy>
    </div>
  );
}
