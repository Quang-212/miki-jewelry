import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { CloseIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import styles from './Cart.module.css';

const mk = classNames.bind(styles);

export default function CartItem() {
  return (
    <div className={mk('cart-item')}>
      <div>
        <Image src={images.adminAvatar} alt="" width={136} height={136} className={mk('image')} />
      </div>
      <div className={mk('col-2')}>
        <h5 className={mk('heading-5')}>Lira Earrings</h5>
        <p className={mk('size')}>Kích thước: 16</p>
        <div className="flex items-center gap-6">
          <Button icon wrapper="p-1 active:bg-primary active:rounded-full">
            <MinusIcon className="active:text-white h-6 w-6" />
          </Button>
          <span className="heading-5">1</span>
          <Button icon wrapper="active:bg-primary active:rounded-full">
            <PlusIcon className="active:text-white w-8 h-8" />
          </Button>
        </div>
      </div>
      <div className={mk('col-3')}>
        <Button icon>
          <CloseIcon />
        </Button>
        <span className={mk('price')}>355.000đ</span>
      </div>
    </div>
  );
}
