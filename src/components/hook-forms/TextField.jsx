import { useFormContext } from 'react-hook-form';

export function TextField({ name, label, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input className="w-1/2 rounded-lg border-2" type="text" {...other} {...register(name)} />
      <span>{errors[name]?.message}</span>
    </>
  );
}
