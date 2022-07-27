import { FormProvider as RHFForm } from 'react-hook-form';

export function FormProvider({ methods, onSubmit, children }) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col justify-center gap-1">
        {children}
      </form>
    </RHFForm>
  );
}
