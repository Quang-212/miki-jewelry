import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { FormProvider, RadioField, SelectField, TextField } from 'src/components/hook-forms';
import { createProduct } from 'src/fetching/products';
import { uploadFile } from 'src/fetching/uploadFile';
import { productVisibilityStatus } from '../products-config';

const stocksSchema = yup.object().shape({
  size: yup.string().required('Size is required'),
  quantity: yup
    .number()
    .typeError('Quantity is required')
    .positive('This field must contain positive numbers')
    .integer('This field must contain integers'),
  price: yup
    .number()
    .typeError('Price is required')
    .positive('This field must contain positive numbers')
    .integer('This field must contain integers'),
  sku: yup.string().required('SKU is required'),
});

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  visibilityStatus: yup.string().typeError('Visibility status is required'),
  stocks: yup.array().of(stocksSchema),
});

export function ProductForm() {
  const [primaryPicture, setPrimaryPicture] = useState({});

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
      visibilityStatus: '',
      discount: '',
      coupon: '',
      stocks: [],
    },
  });

  const { control, handleSubmit, setFocus, reset } = methods;

  const {
    fields: stocksField,
    append: addStock,
    remove: removeStock,
  } = useFieldArray({
    control,
    name: 'stocks',
  });

  const {
    fields: picturesField,
    append: addPicture,
    remove: removePicture,
  } = useFieldArray({
    control,
    name: 'picturesFile',
  });

  const handleCheckPrimaryPicture = (event) => {
    setPrimaryPicture(+event.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    setFocus('name');

    const formData = new FormData();
    data.picturesFile.forEach((file) => {
      formData.append('pictures-file', file[0]);
    });
    console.log([...formData]);

    try {
      const upload = await uploadFile(formData);
      console.log(upload.data);

      const product = await createProduct({
        images: upload.data.map((image, index) => ({
          ...image,
          type: index === primaryPicture ? 'primary' : 'secondary',
        })),
        data,
      });
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <h2 className="heading-2">Products Edit</h2>
      <NormalDivider />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-4"
      >
        <div className="flex flex-col gap-4 w-3/6">
          <div className="bg-white pt-6 px-6">
            <h5 className="heading-5">Basic information</h5>
            <TextField name="name" label="Name" input="mt-2" />
            <TextField name="slug" label="Slug" input="mt-2" />
            <TextField name="description" label="Description" />
          </div>

          <div className="bg-white pt-6 px-6">
            <h5 className="heading-5">Images</h5>
            <Button primary type="button" onClick={() => addPicture()}>
              Add image
            </Button>
            {picturesField.map(({ id }, index) => (
              <div key={id}>
                <input
                  name="primary"
                  type="checkbox"
                  value={index}
                  checked={primaryPicture === index}
                  onChange={handleCheckPrimaryPicture}
                />
                <TextField name={`picturesFile[${index}]`} type="file" />
                <Button primary type="button" onClick={() => removePicture(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button primary title="uppercase">
            Create
          </Button>
        </div>

        <div className="flex flex-col gap-4 w-3/4">
          <div className="flex justify-between">
            <div className="bg-white pt-4 px-4 w-full">
              <h5 className="heading-5">Categories</h5>
              <SelectField
                name="category"
                options={['Ring', 'Necklace', 'Earring', 'Bracelet']}
                wrapper="mt-5"
              />
            </div>
            <div className="bg-white pt-4 px-4 w-full">
              <h5 className="heading-5">Visibility Status</h5>
              <RadioField
                name="visibilityStatus"
                options={productVisibilityStatus}
                wrapper="mt-5"
                subWrapper="flex items-center gap-4"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="bg-white pt-4 px-4 w-full">
              <h5 className="heading-5">Discount</h5>
              <TextField name="discount" wrapper="mt-5" />
            </div>
            <div className="bg-white pt-4 px-4 w-full">
              <h5 className="heading-5">Coupon</h5>
              <TextField name="coupon" wrapper="mt-5" />
            </div>
          </div>
          {stocksField.map(({ id }, index) => (
            <div key={id} className="flex items-center gap-6 bg-white pt-4 px-4">
              <TextField name={`stocks.${index}.size`} label="Size" input="mt-2" />
              <TextField name={`stocks.${index}.quantity`} label="Quantity" input="mt-2" />
              <TextField name={`stocks.${index}.price`} label="Price" input="mt-2" />
              <TextField name={`stocks.${index}.sku`} label="SKU" input="mt-2" />
              <Button primary type="button" onClick={() => removeStock(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button primary type="button" onClick={() => addStock()}>
            Add Stocks
          </Button>
        </div>
      </FormProvider>
    </section>
  );
}
