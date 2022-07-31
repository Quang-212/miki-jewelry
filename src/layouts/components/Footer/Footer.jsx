import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Divider';
import { FormProvider, TextField } from 'src/components/hook-forms';
import { ArrowForwardIcon } from 'src/components/Icons';
import { businessLicense, publicInformation, socialLink } from './footer-config';
import styles from './Footer.module.css';

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

export default function Footer() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    setFocus('email');
    reset();

    // const res = await axios({
    //   method: 'POST',
    // url: '/api/auth/user',
    //   data,
    // });
    // console.log(res.data);
  };

  return (
    <footer className={mk('footer')}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
          <p className="heading-2">Đăng ký để nhận khuyến mãi</p>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col relative">
              <TextField name="email" input="max-w-412-px" />
              <Button icon wrapper="absolute mt-4 ml-96">
                <ArrowForwardIcon />
              </Button>
            </div>
          </FormProvider>
        </div>
        <div className="flex flex-col items-end gap-10">
          <p className="heading-2">Kết nối với chúng tôi tại</p>
          <ul className="flex gap-9">
            {socialLink.map((item, index) => (
              <li key={index}>
                <Button externalLink={item.path}>{item.icon}</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NormalDivider wrapper={mk('divider')} />
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <span className="heading">Miki Jewelry</span>
          <ul className="w-351-px">
            {businessLicense.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-16">
          {publicInformation.map((item, index) => (
            <ul key={index} className="flex flex-col items-start gap-22-px">
              <li className="heading-5">{item.heading}</li>
              {item.content.map((value, index) => (
                <li key={index}>
                  <Button text externalLink={value.path}>
                    {value.title}
                  </Button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className={mk('copyright')}>MikiShop © 2022</p>
    </footer>
  );
}
