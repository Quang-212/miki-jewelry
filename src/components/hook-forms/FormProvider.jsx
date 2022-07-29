import { FormProvider as RHFForm } from 'react-hook-form';

export function FormProvider({ methods, onSubmit, children }) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} className="">
        {children}
      </form>
    </RHFForm>
  );
}
