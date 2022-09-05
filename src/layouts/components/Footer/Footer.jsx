import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import Copyright from 'src/components/Copyright';
import { NormalDivider } from 'src/components/Dividers';
import { FormProvider, TextField } from 'src/components/HookForms';
import { ArrowForwardIcon } from 'src/components/Icons';
import { userPromotion } from 'src/fetching/userPromotion';
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

export function Footer() {
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
      setFocus('email');
      reset();

      const res = await userPromotion();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className={mk('footer', 'container')}>
      <div className={mk('connect')}>
        <div className={mk('promotions')}>
          <p className="heading-2 xs:heading-3 xs:text-[23.5px] xs:tracking-tight">
            Đăng ký để nhận khuyến mãi
          </p>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col relative">
              <TextField name="email" placeholder="Email" wrapper="w-412-px xs:w-343-px" />
              <Button icon wrapper="absolute mt-4 ml-96 xs:ml-312-px">
                <ArrowForwardIcon />
              </Button>
            </div>
          </FormProvider>
        </div>
        <div className={mk('social')}>
          <p className="heading-2 xs:heading-3">Kết nối với chúng tôi tại</p>
          <ul className="flex gap-9 xs:gap-6">
            {socialLink.map((item, index) => (
              <li key={index}>
                <Button externalLink={item.path} wrapper="xs:text-2xl">
                  {item.icon}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <NormalDivider wrapper={mk('divider')} />

      <div className={mk('credit')}>
        <div className="flex flex-col gap-4">
          <span className="heading xs:text-2xl xs:leading-8">Miki Jewelry</span>
          <ul className="w-351-px">
            {businessLicense.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={mk('information')}>
          {publicInformation.map((item, index) => (
            <ul key={index} className={mk('information-links')}>
              <li className="heading-5 xs:subtitle-1">{item.heading}</li>
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
      <Copyright className="mt-6 xs:mt-10">MikiShop © 2022</Copyright>
    </footer>
  );
}
