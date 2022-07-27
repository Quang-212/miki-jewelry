import { useFormContext } from 'react-hook-form';

export function TextField({ name, label, classNameInput, classNameMessage, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type="text" className={classNameInput} {...other} {...register(name)} />
      <span className={classNameMessage}>{errors[name]?.message}</span>
    </>
  );
}
