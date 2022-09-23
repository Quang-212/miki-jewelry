import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { FormProvider, TextField } from '../HookForms';

export default function OtpField() {
  const [code, setCode] = useState(Array.from({ length: 6 }).fill(''));
  // console.log(code);

  // const handleChange = (event, index) => {
  //   const value = event.target.value;

  //   const newOtp = [...otp];
  //   newOtp[index] = value.substring(value.length - 1);
  //   setOtp(newOtp);
  // };

  const { reset, setFocus, watch } = useFormContext();

  useEffect(() => {
    watch(`code-${index}`);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <ul className="flex justify-center items-center space-x-2">
      {code.map((_, index) => (
        <li key={index}>
          <TextField
            name={`code-${index}`}
            input="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl 
          spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
          />
          {index === code.length - 1 ? null : <span className="w-2 py-0.5 bg-gray-400" />}
        </li>
      ))}
    </ul>
  );
}
