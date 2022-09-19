import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { isEmpty, isPlainObject } from 'lodash';
import { useEffect } from 'react';
import Button from 'src/components/Button';
import { FormProvider } from 'src/components/HookForms';
import { createOrder } from 'src/fetching/order';
import { useRouter } from 'src/hooks';
import useDistrict from 'src/hooks/useDistrict';
import useProvince from 'src/hooks/useProvince';
import useWard from 'src/hooks/useWard';
import { formatSearchString } from 'src/utils/formatString';
import styles from './Form.module.css';
import FormAddress from './FormAddress';
import FormPayment from './FormPayment';
import { userState } from 'src/recoils';
import { useRecoilValue } from 'recoil';

const mk = classNames.bind(styles);
const schema = yup.object().shape({
  firstName: yup.string().required('*Vui lòng nhập họ của bạn'),
  lastName: yup.string().required('*Vui lòng nhập tên của bạn'),
  city: yup.string().required('*Trường bắt buộc'),
  district: yup.string().required('*Trường bắt buộc'),
  ward: yup.string().required('*Trường bắt buộc'),
  detailAddress: yup.string().required('*Vui lòng nhập địa chỉ cụ thể của bạn'),
  phone: yup
    .string()
    .required('*Vui lòng nhập số điện thoại của bạn')
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, '*Vui lòng nhập CHÍNH XÁC số điện thoại của bạn'),
  payment: yup.array().typeError('*Vui lòng chọn phương thức thanh toán'),
  newCard: yup.object().when('payment', {
    is: (value) => value.includes('newCard'),
    then: (schema) =>
      schema.shape({
        number: yup.string().required('*Vui lòng nhập số thẻ'),
        expireTime: yup.date().required('*Vui lòng nhập ngày hết hạn'),
        cvv: yup.string().required('*Vui lòng nhập mã CVV'),
      }),
    otherwise: (schema) => schema,
  }),
});

export default function Form({ address, setAddress, chosenOrder }) {
  const { back } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: 'Quang',
      lastName: 'Nguyen',
      city: '',
      district: '',
      ward: '',
      detailAddress: 'so 1 KN',
      phone: '0987234756',
      payment: ['cash'],
      number: '',
      expireTime: new Date(),
      cvv: '',
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const { provinces } = useProvince();
  const { districts } = useDistrict(address.provinces);
  const { wards } = useWard(address.districts);
  const { user } = useRecoilValue(userState);

  useEffect(() => {
    setValue('district', '');
    setValue('ward', '');
  }, [address.provinces]);

  useEffect(() => {
    setValue('ward', '');
  }, [address.districts]);

  const onSubmit = async (data) => {
    //cartInfo =>> existedCard !important
    const { newCard, savedCard, payment, number, expireTime, cvv, ...rest } = data;
    const res = await createOrder({
      order: {
        ...rest,
        paymentMethod: data.payment.join(''),
        ...(data.payment.includes('newCard') && { newCard: data.newCard }),
        ...(data.payment.includes('savedCard') && { cardInfo: 'cardId' }),
        isPaid: !data.payment.includes('cash'),
        user: user._id,
        search: formatSearchString([data.firstName, data.lastName, data.phone]),
        products: chosenOrder.map((orderItem) => {
          const { createdAt, updatedAt, _id, __v, userId, status, product, ...needCartIfo } =
            orderItem;
          return {
            ...needCartIfo,
            product: product._id,
          };
        }),
      },
      cartIds: chosenOrder.map((orderItem) => orderItem._id),
    });
    // console.log({
    //   orders: {
    //     ...rest,
    //     paymentMethod: data.payment.join(''),
    //     ...(data.payment.includes('newCard') && { newCard: data.newCard }),
    //     ...(data.payment.includes('savedCard') && { savedCard: 'cardId' }),
    //     isPaid: !data.payment.includes('cash'),
    //     user: user._id,
    //     search: formatSearchString([data.firstName, data.lastName, data.phone]),
    //     products: chosenOrder.map((orderItem) => {
    //       const { createdAt, updatedAt, _id, __v, userId, status, product, ...needCartIfo } =
    //         orderItem;
    //       return {
    //         ...needCartIfo,
    //         product: product._id,
    //       };
    //     }),
    //   },
    //   cartIds: chosenOrder.map((orderItem) => orderItem._id),
    // });
    //continue handle after order success
  };

  const getName = (name) => {
    switch (name) {
      case 'city':
        return 'provinces';
      case 'district':
        return 'districts';
      case 'ward':
        return 'wards';
      default:
        return '';
    }
  };

  const handleSelect = (name, item) => {
    if (!isPlainObject(item)) {
      return setValue(name, item);
    }
    setValue(name, item.name);
    setAddress((prev) => ({ ...prev, [getName(name)]: item.code }));
  };

  const onSelectCity = async (item) => {
    handleSelect('city', item);
  };

  const onSelectDistrict = async (item) => {
    handleSelect('district', item);
  };

  const onSelectWards = async (item) => {
    handleSelect('ward', item);
  };

  return (
    <section className={mk('form')}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <FormAddress
          provinces={provinces}
          districts={districts}
          wards={wards}
          disableDistricts={isEmpty(watch('city'))}
          disableWards={isEmpty(watch('district'))}
          onSelectCity={onSelectCity}
          onSelectDistrict={onSelectDistrict}
          onSelectWards={onSelectWards}
        />
        <FormPayment setValue={setValue} />

        <div className={mk('btn-list')}>
          <Button text title={mk('btn-back-title')} type="button" onClick={() => back()}>
            Trở lại giỏ hàng
          </Button>
          <Button primary wrapper={mk('btn-submit-wrapper')}>
            Đặt hàng
          </Button>
        </div>
      </FormProvider>
    </section>
  );
}
