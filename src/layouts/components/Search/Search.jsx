import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { motion, useSpring } from 'framer-motion';

import Button from 'src/components/Button';
import { CloseCircleIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ProductItem from 'src/components/ProductItem';
import { getProducts } from 'src/fetching/products';
import { useDebounce, useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import { formatReplaceString } from 'src/utils/formatString';
import styles from './Search.module.css';
import { NormalDivider } from 'src/components/Dividers';

const mk = classNames.bind(styles);

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);

  const [searchState, setSearchState] = useState({
    isLoading: false,
    isError: false,
    errorMessage: '',
    result: [],
    total: null,
  });

  const { isLoading, isError, errorMessage, result, total } = searchState;

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
        limit: 5,
        select: {
          images: 1,
          name: 1,
          slug: 1,
          stocks: 1,
          discount: 1,
        },
      })
        .then(({ data: serverResponse }) => {
          setSearchState((prev) => ({
            ...prev,
            result: serverResponse.data.products,
            total: serverResponse.data.total,
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

  const handleClickSeeAll = () => {
    setShowResult(false);

    if (debouncedValue && !pathname.includes('products')) {
      return push(`${PATH.PRODUCTS}?search=${debouncedValue}`);
    }

    if (pathname.includes('products') && debouncedValue) {
      console.log(query);
      const queryString = qs.stringify({
        ...query,
        search: debouncedValue,
      });
      return push(`${PATH.PRODUCTS}?${queryString}`);
    }

    if (pathname.includes('products') && !debouncedValue) {
      push(PATH.PRODUCTS);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Enter') {
        handleClickSeeAll();
      }
    };
    inputRef.current.addEventListener('keydown', handler);

    return () => {
      inputRef.current?.removeEventListener('keydown', handler);
    };
  }, [debouncedValue, pathname, query]);

  const springConfig = { damping: 40, stiffness: 400 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  const renderResult = (attrs) => {
    return (
      <motion.div className="w-[464px]" tabIndex="-1" style={{ scale, opacity }} {...attrs}>
        <PopperWrapper className="gap-1">
          <ul className="flex flex-col divide-y-1 divide-primary-5">
            {result.map((result) => (
              <ProductItem key={result._id} data={result} />
            ))}
          </ul>
          <NormalDivider />
          <div className="flex justify-center pt-2 pb-3">
            <Button text onClick={handleClickSeeAll} title="font-semibold hover:opacity-80">
              Xem tất cả {total} sản phẩm
            </Button>
          </div>
        </PopperWrapper>
      </motion.div>
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
        animation={true}
        onMount={onMount}
        onHide={onHide}
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
            <Button icon onClick={handleClickSeeAll} wrapper={mk('search-btn')}>
              <SearchIcon />
            </Button>
          </Tippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
