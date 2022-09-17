import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, TextField } from 'src/components/HookForms';
import Autocomplete from 'src/components/Autocomplete';
import {
  COUPON_STATUS,
  COUPON_TYPE,
  DISCOUNT_CATEGORY,
  TARGET_USER_COMPARE,
  TARGET_USER_KEY,
  TARGET_USER_VALUE,
} from './selectConfig';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { createCoupon } from 'src/fetching/coupon';
import { formatSearchString } from 'src/utils/formatString';

const schema = yup.object().shape({
  // code: yup.string(),
  key: yup.string(),
  value: yup.mixed().when('key', {
    is: 'birthday',
    then: (schema) => schema.date().typeError('Type Date'),
    otherWise: (schema) => schema.string(),
  }),
  startDate: yup.date(),
  endDate: yup.date(),
});

export function CouponForm({ currentCoupon, setCurrentCoupon }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { control, handleSubmit, setFocus, setValue, watch } = methods;

  const handleGoToProductsList = () => {
    setCurrentCoupon((prev) => ({ ...prev, formOpen: false }));
  };

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   console.log(data.value);
    //   const res = await createCoupon({
    //     targetUser: [
    //       {
    //         key: data.key,
    //         value: data.value,
    //         compare: data.compare,
    //       },
    //     ],
    //     search: formatSearchString([data.code, data.discount]),
    //     ...data,
    //   });

    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
        <div className="flex gap-3 justify-between">
          <TextField name="code" placeholder="Code" wrapper="w-full" />
          <TextField name="discount" placeholder="discount" wrapper="w-full" />
          <TextField name="limit" placeholder="limit" wrapper="w-full" />
        </div>
        <div className="flex gap-3 justify-between">
          <Autocomplete options={COUPON_TYPE} name="type" placeholder="type" className="w-full" />
          <Autocomplete
            options={COUPON_STATUS}
            name="status"
            placeholder="status"
            className="w-full"
          />
          <Autocomplete
            options={DISCOUNT_CATEGORY}
            name="discountCategory"
            placeholder="discountCategory"
            className="w-full"
          />
        </div>

        <div className="flex gap-3 justify-between">
          <TextField name="startDate" placeholder="discount" wrapper="w-full" type="date" />
          <TextField name="endDate" placeholder="discount" wrapper="w-full" type="date" />
        </div>

        <div className="flex gap-3 justify-between">
          <Autocomplete options={TARGET_USER_KEY} name="key" placeholder="key" className="w-full" />

          {watch('key') === 'birthday' ? (
            <TextField name="value" placeholder="value" wrapper="w-full" type="date" />
          ) : (
            <Autocomplete
              options={TARGET_USER_VALUE}
              name="value"
              placeholder="value"
              className="w-full"
            />
          )}

          <Autocomplete
            options={TARGET_USER_COMPARE}
            name="compare"
            placeholder="compare"
            className="w-full"
          />
        </div>
        <Button primary>Submit</Button>
      </FormProvider>
    </section>
  );
}
