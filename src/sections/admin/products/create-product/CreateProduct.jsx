import axios from 'axios';
import qs from 'qs';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import {
  CheckBoxField,
  FormProvider,
  RadioField,
  SelectField,
  TextField,
} from 'src/components/hook-forms';
import { productSizes, productVisibilityStatus } from '../products-config';
import { createProduct } from 'src/fetching/products';
import { useState } from 'react';

const stocksSchema = yup.object().shape({
  size: yup.string().required('Please enter size of a product'),
  quantity: yup
    .number()
    .typeError('Please enter quantity of a product')
    .positive('This field must contain positive numbers')
    .integer('This field must contain integers'),
  price: yup
    .number()
    .typeError('Please enter price of a product')
    .positive('This field must contain positive numbers')
    .integer('This field must contain integers'),
  sku: yup.string().required('Please enter product SKU'),
});

const schema = yup.object().shape({
  name: yup.string().required('Please enter product name'),
  slug: yup.string().required('Please enter product slug'),
  description: yup.string().required('Please enter product description'),
  category: yup.string().required('Please choose product category'),
  visibilityStatus: yup.string().typeError('Please choose product visibility status'),
  stocks: yup.array().of(stocksSchema),
});

export function CreateProduct() {
  const [picture, setPicture] = useState({});
  const [primaryPicture, setPrimaryPicture] = useState({});

  const methods = useForm({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
      visibilityStatus: '',
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

  const handleUpload = (event, index) => {
    setPicture((prev) => ({ ...prev, [index]: event.target.files[0] }));
  };

  const handleCheckPrimaryPicture = (event) => {
    setPrimaryPicture(+event.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    console.log(formData);
    data.picturesFile.forEach((file) => {
      formData.append('pictures-file', file[0]);
      console.log(file);
    });
    console.log([...formData]);

    try {
      const upload = await axios({
        method: 'POST',
        url: '/api/upload',
        data: formData,
      });
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
