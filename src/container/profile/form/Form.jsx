import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, RadioField, TextField } from 'src/components/HookForms';
import { EmailIcon, LockIcon, PhoneIcon } from 'src/components/Icons';
import { GENDERS } from './form-config';
import styles from './Form.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  name: yup.string().required('*Vui lòng nhập họ và tên'),
  nickname: yup.string().required('*Vui lòng nhập nickname'),
  dateOfBirth: yup.string().required('Vui lòng chọn ngày sinh'),
  gender: yup.string().typeError('*Vui lòng chọn giới tính'),
  phoneNumber: yup
    .string()
    .required('*Vui lòng nhập số điện thoại')
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, '*Vui lòng nhập CHÍNH XÁC số điện thoại'),
  email: yup
    .string()
    .required('*Vui lòng nhập địa chỉ email của bạn')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Vui lòng nhập CHÍNH XÁC địa chỉ email',
    ),
  password: yup
    .string()
    .trim()
    .required('*Vui lòng nhập mật khẩu')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      '*Tối thiểu 8 ký tự, trong đó có 1 ký tự in hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
    ),
});

export default function Form() {
  const methods = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   phoneNumber: '',
    // },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h2 className={mk('title')}>Cập nhật Hồ sơ</h2>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <div className={mk('info-personal')}>
          <h5 className={mk('info-personal-title')}>Thông tin cá nhân</h5>
          <div className="row-span-2">Avatar</div>
          <strong>Họ và tên</strong>
          <TextField name="name" wrapper="col-span-2" />
          <strong>Nickname</strong>
          <TextField name="nickname" wrapper="col-span-2" />
          <strong>Ngày sinh</strong>
          <TextField name="dateOfBirth" type="date" wrapper="col-span-3" />
          <strong>Giới tính</strong>
          <RadioField
            name="gender"
            options={GENDERS}
            wrapper="col-span-3 grid grid-cols-3 items-start"
            subWrapper="flex items-center gap-2"
            caption="col-span-3"
          />
        </div>
        <div className={mk('info-contact-security')}>
          <h5 className={mk('info-contact-title')}>Số điện thoại và Email</h5>
          <span className={mk('info-icon')}>
            <PhoneIcon />
            <strong>Số điện thoại</strong>
          </span>
          <TextField name="phoneNumber" wrapper="col-span-3" />
          <span className={mk('info-icon')}>
            <EmailIcon />
            <strong>Địa chỉ email</strong>
          </span>
          <TextField name="email" wrapper="col-span-3" />
          <h5 className={mk('info-security-title')}>Bảo mật</h5>
          <span className={mk('info-icon')}>
            <LockIcon />
            <strong>Đổi mật khẩu</strong>
          </span>
          <TextField name="password" type="password" wrapper="col-span-3" />
        </div>
        <Button primary wrapper={mk('btn-save')}>
          Lưu thay đổi
        </Button>
      </FormProvider>
    </>
  );
}
