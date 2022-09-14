import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider } from 'src/components/HookForms';
import styles from './Form.module.css';
import FormAddress from './FormAddress';
import FormPayment from './FormPayment';
import useProvince from 'src/hooks/useProvince';
import useDistrict from 'src/hooks/useDistrict';
import useWard from 'src/hooks/useWard';
import { useEffect, useState } from 'react';
import { isEmpty, isPlainObject } from 'lodash';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  // firstName: yup.string().required('*Vui lòng nhập họ của bạn'),
  // lastName: yup.string().required('*Vui lòng nhập tên của bạn'),
  // city: yup.string().required('*Trường bắt buộc'),
  // district: yup.string().required('*Trường bắt buộc'),
  // wards: yup.string().required('*Trường bắt buộc'),
  // addressNumber: yup.string().required('*Vui lòng nhập địa chỉ cụ thể của bạn'),
  // phoneNumber: yup
  //   .string()
  //   .required('*Vui lòng nhập số điện thoại của bạn')
  //   .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, '*Vui lòng nhập CHÍNH XÁC số điện thoại của bạn'),
  payment: yup.array().typeError('*Vui lòng chọn phương thức thanh toán'),
  newCard: yup.object().when('payment', {
    is: (value) => value.includes('newCard'),
    then: (schema) =>
      schema.shape({
        cardNumber: yup.string().required('*Vui lòng nhập số thẻ'),
        date: yup.string().required('*Vui lòng nhập ngày hết hạn'),
        code: yup.string().required('*Vui lòng nhập mã CVV'),
      }),
    otherwise: (schema) => schema,
  }),
});

export default function Form() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      city: '',
      district: '',
      ward: '',
      addressNumber: '',
      phoneNumber: '',
      payment: ['cash'],
      cardNumber: '',
      date: '',
      code: '',
    },
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const [address, setAddress] = useState({
    provinces: null,
    districts: null,
    wards: null,
  });

  const { provinces } = useProvince(); // tự động call lượt đầu để lấy danh sách tỉnh
  const { districts } = useDistrict(address.provinces); //sẽ đợi cho tới khi có province được chọn mới call => cần truyền province code
  const { wards } = useWard(address.districts); //sẽ đợi cho tới khi có district được chọn mới call => cần truyền district code

  useEffect(() => {
    reset({
      district: '',
      ward: '',
    });
  }, [address.provinces]);

  useEffect(() => {
    reset({
      ward: '',
    });
  }, [address.districts]);
  // useEffect(() => {}, [districts]);
  // useEffect(() => {}, [wards]);

  const onSubmit = async (data) => {
    console.log(data);
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

  const handLeSelect = (name, item) => {
    if (!isPlainObject(item)) {
      return setValue(name, item);
    }
    setValue(name, item.name);
    setAddress((prev) => ({ ...prev, [getName(name)]: item.code }));
  };

  const onSelectCity = async (item) => {
    handLeSelect('city', item);
  };

  const onSelectDistrict = async (item) => {
    handLeSelect('district', item);
  };

  const onSelectWards = async (item) => {
    handLeSelect('ward', item);
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
          <Button text title={mk('btn-back-title')}>
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
