import { useFormContext } from 'react-hook-form';

export function CheckboxField({ name, label, category, id, ...other }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label>{label}</label>
      {category?.map((value) => (
        <div key={value}>
          <label htmlFor={value}>{value}</label>
          <input id={value} type="checkbox" value={value} {...other} {...register(name)} />
        </div>
      ))}
      <span>{errors[name]?.message}</span>
    </>
  );
}
