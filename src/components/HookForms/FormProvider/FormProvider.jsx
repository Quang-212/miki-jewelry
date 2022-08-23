import { FormProvider as RHFForm } from 'react-hook-form';
import classNames from 'classnames';

import styles from './FormProvider.module.css';

export function FormProvider({ methods, onSubmit, className, children }) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} className={classNames(styles.root, className)}>
        {children}
      </form>
    </RHFForm>
  );
}
