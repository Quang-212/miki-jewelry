import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, TextField } from 'src/components/HookForms';
import Autocomplete from 'src/components/Autocomplete';
import { COUPON_STATUS, COUPON_TYPE, DISCOUNT_CATEGORY } from './selectConfig';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';

const schema = yup.object().shape({
  code: yup.string(),
  type: yup.string,
});

export function CouponForm({ setShowProductsList, currentCoupon, setCurrentProduct }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { control, handleSubmit, setFocus, setValue } = methods;

  const handleGoToProductsList = () => {
    setCurrentProduct((prev) => ({ ...prev, formOpen: false }));
    setShowProductsList((prev) => !prev);
  };

  const onSubmit = async (data) => {};

  return (
    <section className="flex flex-col gap-8 px-4">
      <div className="flex justify-between">
        <h2 className="heading-2">{currentCoupon.isEdit ? 'Edit Product' : 'Create Product'}</h2>
        <Button primary onClick={handleGoToProductsList}>
          Products List
        </Button>
      </div>
      <NormalDivider />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        // className="flex justify-between gap-4"
      >
        <TextField name="code" placeholder="Code" />
        <div className="flex gap-3 justify-between">
          <Autocomplete options={COUPON_TYPE} name="type" placeholder="type" />
          <Autocomplete options={COUPON_STATUS} name="status" placeholder="status" />
          <Autocomplete
            options={DISCOUNT_CATEGORY}
            name="discountCategory"
            placeholder="discountCategory"
          />
        </div>
        <TextField name="code" placeholder="discount" />

        <div className="flex gap-3 justify-between">
          <TextField name="limit" placeholder="limit" />
          <TextField name="limit" placeholder="discount" />
        </div>
      </FormProvider>
    </section>
  );
}
