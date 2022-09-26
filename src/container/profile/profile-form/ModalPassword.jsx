import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import * as yup from 'yup';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { FormProvider, TextField } from 'src/components/HookForms';
import { CloseIcon } from 'src/components/Icons';
import { updateUser } from 'src/fetching/user';
import styles from './ProfileForm.module.css';

const mk = classNames.bind(styles);

const schemaPassword = yup.object().shape({
  currentPassword: yup.string().trim().required('*Vui lòng nhập mật khẩu'),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //   '*Tối thiểu 8 ký tự, trong đó có 1 ký tự in hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
  // ),
  newPassword: yup.string().trim().required('*Vui lòng nhập mật khẩu'),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //   '*Tối thiểu 8 ký tự, trong đó có 1 ký tự in hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
  // ),
  confirmPassword: yup
    .string()
    .trim()
    .required('*Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('newPassword'), null], '*Mật khẩu đã nhập chưa đúng'),
});

export default function ModalPassword({ isOpen, handleCloseModal }) {
  const methodsPassword = useForm({
    resolver: yupResolver(schemaPassword),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit: handleSubmitPassword } = methodsPassword;

  const onSubmitPassword = async (data) => {
    try {
      const res = await toast.promise(
        updateUser(data, {
          params: { userId: user._id },
        }),
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
      console.log(res.data);

      setUser((prev) => ({
        ...prev,
        user: res.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
      <div className="flex flex-col">
        <div className="flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <FormProvider methods={methodsPassword} onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <p className="heading-5">Đổi mật khẩu</p>
          <TextField
            name="currentPassword"
            password
            label="Mật khẩu hiện tại"
            wrapper="mt-8"
            input="mt-1"
            viewIcon="top-11"
          />
          <TextField
            name="newPassword"
            password
            label="Mật khẩu mới"
            wrapper="mt-3"
            input="mt-1"
            viewIcon="top-11"
          />
          <TextField
            name="confirmPassword"
            password
            label="Nhập lại mật khẩu mới"
            wrapper="mt-3"
            input="mt-1"
            viewIcon="top-11"
          />
          <Button primary wrapper="mt-8 w-full">
            Lưu thay đổi
          </Button>
        </FormProvider>
      </div>
    </Dialog>
  );
}
