import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { TextField } from '../HookForms';

export default function OtpField() {
  // console.log(code);

  // const handleChange = (event, index) => {
  //   const value = event.target.value;

  //   const newOtp = [...otp];
  //   newOtp[index] = value.substring(value.length - 1);
  //   setOtp(newOtp);
  // };

  const { setFocus, control, setValue } = useFormContext();
  const [{ index: currentIndex, target, type }, setCurrentInput] = useState({
    index: null,
    target: null,
    type: '',
  });
  const { fields } = useFieldArray({
    control,
    name: 'code',
  });

  const codeWatch = useWatch({ name: 'code', control });

  const CODE_LENGTH = fields.length - 1;
  const inputRef = useRef();
  useEffect(() => {
    const valueByIndex = codeWatch[currentIndex];
    console.log(codeWatch);
    // if (type === 'click') {
    //   setFocus(`code[${currentIndex}]`);
    // }
    if (valueByIndex) {
      setValue(
        `code[${currentIndex}]`,
        valueByIndex.includes('-') ? valueByIndex.slice(1) : valueByIndex.slice(0, 1),
      );

      !codeWatch[currentIndex].includes('-') &&
        type !== 'click' &&
        setFocus(`code[${currentIndex + 1 > CODE_LENGTH ? CODE_LENGTH : currentIndex + 1}]`);
    }
  }, [codeWatch?.[currentIndex], type]);

  useEffect(() => {
    if (type === 'click') {
      setFocus(`code[${currentIndex}]`);
    }
  }, [type]);

  useEffect(() => {
    const keyDownHandler = ({ key }) => {
      if (key === 'Backspace') {
        for (let i = currentIndex + 1; i <= CODE_LENGTH; i++) {
          setValue(`code[${i}]`, '');
        }
        setFocus(`code[${currentIndex - 1}]`);
      }
    };
    target?.addEventListener('keydown', keyDownHandler);
    // target?.addEventListener('click', keyDownHandler);
    return () => {
      target?.removeEventListener('keydown', keyDownHandler);
      // target?.removeEventListener('keydown', keyDownHandler);
    };
  }, [target]);

  return (
    <ul className="flex justify-center items-center space-x-2">
      {fields.map((field, index) => (
        <TextField
          key={field.id}
          // ref={currentIndex === index ? inputRef : null}
          name={`code[${index}]`}
          // onFocus={({ target }) => setCurrentInput({ index, target, type: 'focus' })}
          // onChange={({ target }) => setCurrentInput({ index, target, type: '' })}
          onClick={({ target }) => setCurrentInput({ index, target, type: 'click' })}
          input="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl 
          spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
        />
      ))}
      {/* {index === code.length - 1 ? null : <span className="w-2 py-0.5 bg-gray-400" />} */}
    </ul>
  );
}
