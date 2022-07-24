import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  CheckBoxField,
  FormProvider,
  RadioField,
  SelectField,
  TextField,
} from 'src/components/hook-forms';

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .required('Please enter your email address')
  //   .matches(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     'Please enter a valid email address',
  //   ),
  // password: yup
  //   .string()
  //   .trim()
  //   .required('Please enter your password')
  //   .matches(
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //     'Minimum of 8 characters, at least one letter and one number',
  //   ),
  // confirmPassword: yup
  //   .string()
  //   .trim()
  //   .required('Please enter your password')
  //   .oneOf([yup.ref('password'), null], 'Password is not matched'),
  favorites: yup
    .array()
    .typeError('Please choose your favorites')
    .min(1, 'Please choose your favorites'),
});

export function RegisterFormSection() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValue: {
      // email: '',
      // password: '',
      // confirmPassword: '',
      // address: '',
      favorites: [],
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = (data) => {
    console.log(data);
    // setFocus('email');
    reset();
  };

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField name="email" label="E-mail address" />
        <TextField name="password" label="Password" type="password" />
        <TextField name="confirmPassword" label="Confirm Password" type="password" /> */}
        {/* <SelectField
          name="address"
          label="Your address"
          options={['Hanoi', 'Da Nang', 'Saigon', 'Kieng Giang']}
        /> */}
        {/* <RadioField name="gender" label="Your gender" options={['Male', 'Female', 'Other']} /> */}
        <CheckBoxField
          name="favorites"
          label="Your favorites"
          category={['Ring', 'Day Chuyen', 'Lac Tay']}
        />
        <button>Submit</button>
      </FormProvider>
    </div>
  );
}
