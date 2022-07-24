import { useFormContext } from 'react-hook-form';

export function RadioField({ name, label, options, id, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label>{label}</label>
      {options?.map((value) => (
        <div key={value}>
          <label htmlFor={value}>{value}</label>
          <input id={value} type="radio" value={value} {...other} {...register(name)} />
        </div>
      ))}
      <span>{errors[name]?.message}</span>
    </>
  );
}
