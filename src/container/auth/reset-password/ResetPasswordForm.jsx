import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { useRouter } from 'src/hooks';
import styles from './Form.module.css';
import { userExistedChecking } from 'src/fetching/auth';
import { toast } from 'react-toastify';
import { PATH } from 'src/routes';
import { sendCode } from 'src/fetching/mailer';

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

export default function ResetPasswordForm() {
  const { back, push } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async ({ email }) => {
    try {
      await userExistedChecking(email);
      await toast.promise(
        sendCode({ email }),
        {
          pending: {
            render() {
              return 'Gửi mã xác nhận...';
            },
            icon: false,
          },
          success: {
            render({ data }) {
              return data.data.message;
            },
            icon: '😊',
          },
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              return data.response.data.message;
            },
          },
        },
        { autoClose: 5000 },
      );
      sessionStorage.setItem('email', JSON.stringify(email));
      push(PATH.VERIFY_EMAIL('reset-password'));
    } catch (error) {
      if (error.response?.status === 404) {
        toast(error.response.data.message, { type: 'warning' });
      }
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
        <h5
          className={mk('title m-auto mt-4 font-primary font-bold text-xl leading-7 text-primary')}
        >
          Xác thực tài khoản
        </h5>
        <p className={mk('description')}>
          Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn, chúng tôi sẽ gửi mã xác
          thực để đặt lại mật khẩu
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
