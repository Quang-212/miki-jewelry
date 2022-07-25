import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/hook-forms';
import { ArrowForwardIcon } from 'src/components/Icons';
import { businessLicense, publicInformation, socialLink } from './navConfig';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('*Please enter your email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Please enter a valid email address',
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

  const onSubmit = (data) => {
    console.log(data);
    setFocus('email');
    reset();
  };

  return (
    <footer className="container">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
          <p className="heading-2">Đăng ký để nhận khuyến mãi</p>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col relative">
              <TextField
                name="email"
                classNameInput="w-412-px h-12 py-3 px-4 rounded-primary border border-primary-1"
                classNameMessage="block h-5 text-caption-1"
              />
              <Button icon className="absolute mt-4 ml-96">
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
      <hr className="mt-7 mb-10 border border-primary-1" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <p className="heading">Miki Jewelry</p>
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
      <p className="flex justify-center mt-6 mb-2">MikiShop © 2022</p>
    </footer>
  );
}
