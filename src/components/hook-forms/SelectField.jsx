import { useFormContext } from 'react-hook-form';

export function SelectField({ name, label, options, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select {...other} {...register(name)}>
        {options.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
      <span>{errors[name]?.message}</span>
    </>
  );
}
