import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { NormalDivider } from 'src/components/Dividers';
import { applyCoupon, getMyCoupon } from 'src/fetching/coupon';
import { CloseIcon } from 'src/components/Icons';
import { useClientSide, useRouter } from 'src/hooks';
import { totalCartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Calculation.module.css';

const mk = classNames.bind(styles);

export default function Calculation({ checked }) {
  const [discountByCoupon, setDiscountByCoupon] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const totalCart = useRecoilValue(totalCartState({ filterCartIds: checked.orders }));
  const [coupon, setCoupon] = useState('');
  // const [coupon, setCoupon] = useState({
  //   selectedCoupon: "",
  //   list: []
  // });

  const isClient = useClientSide();
  const { user } = useRecoilValue(userState);
  const { push } = useRouter();

  const handleSubmit = async () => {
    const orderId = JSON.parse(sessionStorage.getItem('orders'));
    if (isEmpty(orderId)) {
      return setIsOpen(true);
    }
    // try {
    //   const res = await applyCoupon({
    //     params: {
    //       userId: user._id,
    //       id: '63234deabb303d823a901a0e',
    //       state: 'checking',
    //     },
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    //   toast(error.response?.data?.message || 'Lỗi hệ thống', { type: 'error' });
    // }

    push(PATH.ORDER);
  };

  useEffect(() => {
    getMyCoupon(user._id).then(({ data }) => console.log(data));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('discount', JSON.stringify(discountByCoupon));
  }, [discountByCoupon]);
  const handleApplyCoupon = async () => {
    try {
      // if (coupon.selectedCoupon) {
      const res = await applyCoupon({
        params: {
          userId: user._id,
          id: '63234deabb303d823a901a0e',
          state: 'checking',
        },
      });
      console.log(res);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowCoupon = async () => {};

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isClient && (
        <section className={mk('calculation')}>
          <h3 className={mk('font-primary font-semibold text-2xl leading-8 text-primary')}>
            Tạm tính
          </h3>
          <div className={mk('coupon')}>
            <h5 className="col-span-3 font-primary font-bold text-xl leading-7 text-primary">
              Ưu đãi
            </h5>

            <input
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              onFocus={handleShowCoupon}
              type="text"
              placeholder="Nhập mã ưu đãi"
              className={mk('input')}
            />

            <Button onClick={handleApplyCoupon} primary wrapper="h-12 px-2">
              {coupon.selectedCoupon ? 'Dùng sau' : 'Áp dụng'}
            </Button>
          </div>
          <NormalDivider wrapper="my-2" />
          <div className={mk('detail')}>
            <ul className={mk('titles')}>
              <li>Giá sản phẩm</li>
              <li>Phí giao hàng</li>
              <li>Giảm giá</li>
            </ul>
            <ul className={mk('prices')}>
              <li className="font-primary font-bold text-xl leading-7 text-primary">
                {formatVndCurrency(totalCart)}
              </li>
              <li className="font-primary font-bold text-xl leading-7 text-primary">50.000đ</li>
              <li className="font-primary font-bold text-xl leading-7 text-primary">
                {formatVndCurrency(discountByCoupon)}
              </li>
            </ul>
          </div>
          <NormalDivider wrapper="my-2" />
          <div className={mk('total')}>
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">Tổng</h5>
            <span className="font-primary font-bold text-xl leading-7 text-primary-1">
              {formatVndCurrency(totalCart - discountByCoupon)}
            </span>
          </div>
          <Button primary onClick={handleSubmit} wrapper={mk('btn')}>
            Thanh toán
          </Button>

          <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end cursor-pointer">
                <CloseIcon onClick={handleCloseModal} />
              </div>
              <p className="text-lg">Bạn vẫn chưa chọn sản phẩm nào để mua</p>
              <Button primary onClick={handleCloseModal} wrapper="w-full mt-10">
                Đồng ý
              </Button>
            </div>
          </Dialog>
        </section>
      )}
    </>
  );
}
