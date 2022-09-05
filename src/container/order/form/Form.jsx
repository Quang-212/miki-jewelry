import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider } from 'src/components/HookForms';
import styles from './Form.module.css';
import FormAddress from './FormAddress';
import FormPayment from './FormPayment';

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
      wards: '',
      addressNumber: '',
      phoneNumber: '',
      payment: ['cash'],
      cardNumber: '',
      date: '',
      code: '',
    },
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <section className={mk('form')}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <FormAddress />
        <FormPayment setValue={setValue} />

        <div className={mk('btn-list')}>
          <Button text title={mk('btn-back-title')}>
            Trở lại giỏ hàng
          </Button>
          <Button primary wrapper={mk('btn-submit-wrapper')}>
            Thanh toán
          </Button>
        </div>
      </FormProvider>
    </section>
  );
}
