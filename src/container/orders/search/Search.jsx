import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { CloseCircleIcon, LoadingIcon, SearchIcon } from 'src/components/Icons';
import { useDebounce } from 'src/hooks';

import styles from './Search.module.css';

const mk = classNames.bind(styles);

export default function Search({ onSearch }) {
  // const [searchValue, setSearchValue] = useState('');
  // const [searchResult, setSearchResult] = useState([]);
  // const [showResult, setShowResult] = useState(false);

  // const inputRef = useRef();

  const handleClear = () => {
    console.log('clear');
  };

  return (
    <div className={mk('search', 'container')}>
      <input
        // ref={inputRef}
        // value={searchValue}
        onChange={(event) => onSearch({ status: true, value: event.target.value })}
        placeholder="Tìm kiếm đơn hàng theo Mã đơn hàng hoặc tên sản phẩm"
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
