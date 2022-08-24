import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { FormProvider, RadioField, SelectField, TextField } from 'src/components/HookForms';
import Image from 'src/components/Image';
import { deleteImage } from 'src/fetching/deleteImage';
import { createProduct, updateProduct } from 'src/fetching/products';
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
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  visibilityStatus: yup.string().typeError('Visibility status is required'),
  discount: yup
    .number()
    .positive('This field must contain positive numbers')
    .integer('This field must contain integers'),
  stocks: yup.array(1, 'At least ONE stock').of(stocksSchema),
});

export function ProductForm({ setShowProductsList, currentProduct, setCurrentProduct }) {
  const [primaryImage, setPrimaryImage] = useState(
    currentProduct.data.images?.findIndex((image) => image.type === 'primary') || 0,
  );
  const [previewImages, setPreviewImages] = useState([]);

  const handleCheckPrimaryImage = (event) => {
    setPrimaryImage(+event.target.value);
  };

  const previewImage = (index) => previewImages[index] && URL.createObjectURL(previewImages[index]);

  const handleGoToProductsList = () => {
    setCurrentProduct((prev) => ({ ...prev, formOpen: false }));
    setShowProductsList((prev) => !prev);
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentProduct.data.name,
      description: currentProduct.data.description,
      category: currentProduct.data.category,
      visibilityStatus: currentProduct.data.visibilityStatus,
      discount: currentProduct.data.discount,
      coupon: currentProduct.data.coupon,
      stocks: currentProduct.data.stocks,
      images: currentProduct.data.images,
    },
  });

  const { control, handleSubmit, setFocus } = methods;
  const image = useWatch({
    control,
  });

  const {
    fields: stocksField,
    append: addStock,
    remove: removeStock,
  } = useFieldArray({
    control,
    name: 'stocks',
  });

  const {
    fields: imagesField,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  useEffect(() => {
    setPreviewImages(image.images?.map((image) => image[0]) || []);
  }, [image]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setFocus('name');

      const formData = new FormData();

      const distributedImage = data.images.reduce(
        (imageCategory, image) => {
          if (image.url) {
            imageCategory.formattedImages.push(image);
          } else {
            imageCategory.files.push(image);
            imageCategory.formattedImages.push(null);
          }
          return imageCategory;
        },
        {
          files: [],
          formattedImages: [],
        },
      );

      distributedImage.files.forEach((file) => {
        formData.append('pictures-file', file[0]);
      });

      if (currentProduct.isEdit) {
        const newUploadedImage = !isEmpty(distributedImage.files) && (await uploadFile(formData));

        const imageIds = currentProduct.data.images
          ?.filter((_, index) => distributedImage.formattedImages[index] === null)
          .map((image) => ({ public_id: image.public_id }));

        let index = 0;
        const newImages = distributedImage.formattedImages
          .map((image) => {
            if (image) return image;
            else {
              const qwerty = newUploadedImage.data[index];
              index++;
              return qwerty;
            }
          })
          .map((image, index) => ({
            ...image,
            type: primaryImage === index ? 'primary' : 'secondary',
          }));
        console.log(newImages, newUploadedImage.data);

        const apiRequests = [
          updateProduct({ ...data, images: newImages }, currentProduct.data._id),
        ];

        !isEmpty(distributedImage.files) && apiRequests.push(deleteImage({ images: imageIds }));
        const updatedProduct = await toast.promise(
          Promise.all(apiRequests),
          {
            pending: {
              render() {
                return 'Đang kết nối';
              },
              icon: false,
            },
            success: {
              render({ data }) {
                return data[0].data.message;
              },
              // other options
              icon: '😊',
            },
            error: {
              render({ data }) {
                console.log(data)
                return data.response.data.message;
              },
            },
          },
          { autoClose: 4000 },
        );
        console.log(updatedProduct);
      } else {
        const upload = await uploadFile(formData);
        console.log(upload.data);

        const product = await toast.promise(
          createProduct({
            ...data,
            images: upload.data.map((image, index) => ({
              ...image,
              type: index === primaryImage ? 'primary' : 'secondary',
            })),
          }),
          {
            pending: {
              render() {
                return 'Đang kết nối';
              },
              icon: false,
            },
            success: {
              render({ data }) {
                return data.data.message;
              },
              // other options
              icon: '😊',
            },
            error: {
              render({ data }) {
                return data.response.data.message;
              },
            },
          },
          { autoClose: 4000 },
        );
        console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="heading-2">{currentProduct.isEdit ? 'Edit Product' : 'Create Product'}</h2>
        <Button primary onClick={handleGoToProductsList}>
          Products List
        </Button>
      </div>
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
            <TextField name="description" label="Description" />
          </div>

          <div className="bg-white pt-6 px-6">
            <h5 className="heading-5">Images</h5>
            <Button primary type="button" onClick={() => addImage()}>
              Add image
            </Button>
            {imagesField.map((item, index) => {
              return (
                <div key={item.id}>
                  <input
                    name="primary"
                    type="checkbox"
                    value={index}
                    checked={primaryImage === index}
                    onChange={handleCheckPrimaryImage}
                  />
                  <Image
                    src={previewImage(index) || item.url}
                    alt="hello"
                    width={120}
                    height={120}
                  />
                  <TextField name={`images[${index}]`} type="file" />
                  <Button primary type="button" onClick={() => removeImage(index)}>
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
          <Button primary title="uppercase">
            {currentProduct.isEdit ? 'Update' : 'Create'}
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
