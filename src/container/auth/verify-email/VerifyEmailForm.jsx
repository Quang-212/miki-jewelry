import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'src/components/Button';
import { FormProvider } from 'src/components/HookForms';
import OtpField from 'src/components/OtpField';
import { registerForm } from 'src/fetching/auth';
import { sendCode, verifyCode } from 'src/fetching/mailer';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import styles from './VerifyEmailForm.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .required('*Vui lòng nhập địa chỉ email của bạn')
  //   .matches(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     '*Vui lòng nhập đúng địa chỉ email của bạn',
  //   ),
});
const VALID_TYPE = ['register', 'reset-password'];

export default function VerifyEmailForm() {
  const { query, isReady, replace, push } = useRouter();
  const [user, setUser] = useState({});
  const [validURL, setValidURL] = useState(true);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      code: Array.from({ length: 6 }).fill('-'),
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (!VALID_TYPE.includes(query.type) || isEmpty(JSON.parse(sessionStorage.getItem('user')))) {
      setValidURL(false);
    } else {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
  }, [isReady, query]);
  // modal đường dẫn không hợp lệ => quay lại login(replace)
  console.log('type', query.type, validURL);

  const onSubmit = async (data) => {
    try {
      if (query.type === 'register') {
        await registerForm(user, { params: { code: data.code.join('') } });
        sessionStorage.removeItem('user');
        return replace(PATH.login);
      }
      if (query.type === 'reset-password') {
        const email = JSON.parse(sessionStorage.getItem('email'));
        if (!email) {
          return toast('Quá trình xác thực hết hạn, vui lòng thử lại', { type: 'info' });
        }
        await verifyCode({ params: { email, code: data.code.join('') } });
        push(PATH.NEW_PASSWORD({ email, code: data.code.join('') }));
      }
    } catch (error) {
      if ([401, 403, 409].includes(error.response?.status)) {
        toast(error.response.data.message, { type: 'warning' });
      }
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      await sendCode({
        email: user.email,
      });
    } catch (error) {
      console.log(error);
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
          Vui lòng kiểm tra email của bạn!
        </h5>
        <p className={mk('description')}>
          Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email tới
          <strong>{user.email}</strong>, vui lòng nhập mã vào ô bên dưới để xác minh email của bạn.
        </p>

        <OtpField />

        <Button type="submit" primary wrapper={mk('btn-submit')}>
          Xác nhận
        </Button>
        <p>
          Chưa nhận được mã?{' '}
          <Button
            type="button"
            onClick={handleResendCode}
            text
            title="font-semibold text-primary-2 hover:underline underline-offset-4"
          >
            Gửi lại mã
          </Button>
        </p>
      </FormProvider>
    </section>
  );
}
