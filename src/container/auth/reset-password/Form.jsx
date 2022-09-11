import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { useRouter } from 'src/hooks';
import styles from './Form.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  email: yup
    .string()
    .required('*Vui lòng nhập địa chỉ email của bạn')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Vui lòng nhập đúng địa chỉ email của bạn',
    ),
});

export default function Form() {
  const { back } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);

      setFocus('email');
      reset();
    }
  };

  return (
    <section className={mk('reset-password')}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <h5 className={mk('title')}>Xác thực tài khoản</h5>
        <p className={mk('description')}>
          Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn, chúng tôi sẽ gửi đường
          link khôi phục mật khẩu
        </p>
        <TextField name="email" placeholder="Nhập email" input={mk('email-input')} />
        <Button primary wrapper={mk('btn-submit')}>
          Xác nhận
        </Button>
        <Button type="button" outline onClick={() => back()}>
          Trở về
        </Button>
      </FormProvider>
    </section>
  );
}
