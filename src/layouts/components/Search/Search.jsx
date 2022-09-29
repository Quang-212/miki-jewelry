import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import qs from 'qs';
import Button from 'src/components/Button';
import { CloseCircleIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ProductItem from 'src/components/ProductItem';
import { getProducts } from 'src/fetching/products';
import { useDebounce, useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import { formatReplaceString } from 'src/utils/formatString';
import styles from './Search.module.css';

const mk = classNames.bind(styles);

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);

  const [searchState, setSearchState] = useState({
    isLoading: false,
    isError: false,
    errorMessage: '',
    result: [],
  });
  const { isLoading, isError, errorMessage, result } = searchState;

  const inputRef = useRef();
  const { push, pathname, query } = useRouter();

  const debouncedValue = useDebounce(formatReplaceString(searchValue), 600);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchState((prev) => ({
        ...prev,
        result: [],
      }));
    } else {
      setSearchState((prev) => ({ ...prev, isLoading: true }));

      getProducts([], {
        search: debouncedValue,
        select: {
          images: 1,
          name: 1,
          slug: 1,
          stocks: 1,
        },
      })
        .then(({ data: serverResponse }) => {
          setSearchState((prev) => ({
            ...prev,
            result: serverResponse.data.products,
          }));
        })
        .catch((error) => {
          console.log(error);
          setSearchState((prev) => ({
            ...prev,
            isError: true,
            errorMessage: error.response?.data.message,
          }));
        })
        .finally(() => setSearchState((prev) => ({ ...prev, isLoading: false })));
    }
  }, [debouncedValue]);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Enter') {
        setShowResult(false);

        if (debouncedValue && !pathname.includes('products')) {
          return push(`${PATH.products}?search=${debouncedValue}`);
        }

        if (pathname.includes('products') && debouncedValue) {
          console.log(query);
          const queryString = qs.stringify({
            ...query,
            search: debouncedValue,
          });
          return push(`${PATH.products}?${queryString}`);
        }

        if (pathname.includes('products') && !debouncedValue) {
          push(PATH.products);
        }
      }
    };
    inputRef.current.addEventListener('keydown', handler);

    return () => {
      inputRef.current?.removeEventListener('keydown', handler);
    };
  }, [debouncedValue, pathname, query]);

  const renderResult = (attrs) => {
    return (
      <div className="w-[430px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className="gap-1">
          <h4 className="py-1 px-3">Sản phẩm: {result.length}</h4>
          <ul className="flex flex-col gap-2">
            {result.map((result) => (
              <ProductItem key={result._id} data={result} />
            ))}
          </ul>
        </PopperWrapper>
      </div>
    );
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchState((prev) => ({
      ...prev,
      result: [],
    }));
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

  if (isError) return <h2>{errorMessage}</h2>;

  return (
    <div>
      <HeadlessTippy
        visible={showResult && result.length > 0}
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
              <CloseCircleIcon />
            </Button>
          )}

          {isLoading && (
            <Button icon wrapper={mk('loading')}>
              <LoadingIcon />
            </Button>
          )}
          <Tippy content={<span>Tìm kiếm</span>}>
            <Button icon wrapper={mk('search-btn')}>
              <SearchIcon />
            </Button>
          </Tippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
