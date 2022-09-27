import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { FormProvider } from 'src/components/HookForms';
import { CloseIcon } from 'src/components/Icons';
import OtpField from 'src/components/OtpField';
import { registerForm } from 'src/fetching/auth';
import { sendCode, verifyCode } from 'src/fetching/mailer';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import styles from './VerifyEmailForm.module.css';

const mk = classNames.bind(styles);

const VALID_TYPE = ['register', 'reset-password'];

export default function VerifyEmailForm() {
  const { query, isReady, replace, push } = useRouter();

  const [user, setUser] = useState({});
  const [validURL, setValidURL] = useState(true);

  const methods = useForm({
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

  const onSubmit = async (data) => {
    try {
      if (query.type === 'register') {
        await toast.promise(
          registerForm(user, { params: { code: data.code.join('') } }),
          {
            pending: {
              render() {
                return 'Đang kết nối';
              },
              icon: '😇',
            },
            success: {
              render({ data }) {
                return data.data.message;
              },
              icon: '😍',
            },
            error: {
              render({ data }) {
                return data.response?.data.message;
              },
              icon: '😵‍💫',
            },
          },
          { autoClose: 4000 },
        );
        sessionStorage.removeItem('user');
        return replace(PATH.LOGIN);
      }

      if (query.type === 'reset-password') {
        const email = JSON.parse(sessionStorage.getItem('email'));
        if (!email) {
          return toast('Quá trình xác thực hết hạn, vui lòng thử lại', { type: 'info' });
        }
        await toast.promise(
          verifyCode({ params: { email, code: data.code.join('') } }),
          {
            pending: {
              render() {
                return 'Đang kết nối';
              },
              icon: '😇',
            },
            success: {
              render({ data }) {
                return data.data.message;
              },
              icon: '😍',
            },
            error: {
              render({ data }) {
                return data.response?.data.message;
              },
              icon: '😵‍💫',
            },
          },
          { autoClose: 4000 },
        );
        push(PATH.NEW_PASSWORD({ email, code: data.code.join('') }));
      }
    } catch (error) {
      if ([401, 403, 409].includes(error.response?.status)) {
        toast(error.response.data.message, { type: 'error' });
      }
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      const email = JSON.parse(sessionStorage.getItem('email'));
      if (!email) {
        return toast('Quá trình xác thực hết hạn, vui lòng thử lại', { type: 'info' });
      }
      await sendCode({
        email: user.email || email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToLoginPage = () => replace(PATH.LOGIN);
  const handleCloseModal = () => {};

  return (
    <section className={mk('reset-password')}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <h5 className={mk('title ')}>Vui lòng kiểm tra email của bạn!</h5>
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
      <Dialog isOpen={!validURL} closeModal={handleCloseModal} content="w-[600px] px-12">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end cursor-pointer">
            <CloseIcon onClick={handleCloseModal} />
          </div>
          <p className="text-xl">Đường dẫn của bạn không hợp lệ hoặc đã bị chỉnh sửa</p>
          <Button primary onClick={handleGoToLoginPage} wrapper="mt-10 w-full">
            Chuyển về trang đăng nhập
          </Button>
        </div>
      </Dialog>
    </section>
  );
}
