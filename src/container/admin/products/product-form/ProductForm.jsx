import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

import { isArray, isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { FormProvider, RadioField, SelectField, TextField } from 'src/components/HookForms';
import Image from 'src/components/Image';
import { createProduct, updateProduct } from 'src/fetching/products';
import { deleteImage, uploadFile } from 'src/fetching/upload';
import { productVisibilityStatus } from '../products-config';
import { formatSearchString } from 'src/utils/formatString';

const stocksSchema = yup.object().shape({
  size: yup.string().required('Size is required'),
  quantity: yup
    .number()
    .typeError('Quantity is required')
    .min(1, 'This field must be at least 1')
    .integer('This field must contain integers'),
  price: yup
    .number()
    .typeError('Price is required')
    .min(1, 'This field must be at least 1')
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
    .min(0, 'This field must be at least 0')
    .integer('This field must contain integers'),
  stocks: yup.array().of(stocksSchema),
});

export function ProductForm({
  setShowProductsList,
  onAddNewProduct,
  onUpdateProduct,
  currentProduct,
  setCurrentProduct,
}) {
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
      name: currentProduct.data.name || '',
      description: currentProduct.data.description || '',
      category: currentProduct.data.category || 'ring',
      visibilityStatus: currentProduct.data.visibilityStatus || 'published',
      discount: currentProduct.data.discount || 0,
      stocks: currentProduct.data.stocks || [],
      images: currentProduct.data.images || [],
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;
  const image = useWatch({
    control,
  });
  console.log(errors);
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
    if (isEmpty(data.images)) {
      return setError('images', '1');
    }

    if (isEmpty(data.stocks)) {
      return setError('stocks', '1');
    }

    try {
      data = {
        ...data,
        search: formatSearchString([
          data.name,
          data.description,
          ...data.stocks.map((stock) => stock.price.toString()),
        ]),
      };

      const formData = new FormData();

      const distributedImage = data.images.reduce(
        ({ files, uploadedImages }, image, index) => {
          if (image.url) {
            uploadedImages.push({ index, content: image });
          } else {
            files.push({ index, content: image });
          }
          return { files, uploadedImages };
        },
        {
          files: [],
          uploadedImages: [],
        },
      );

      distributedImage.files.forEach((file) => {
        formData.append('pictures-file', file.content[0]);
      });

      if (currentProduct.isEdit) {
        const newUploadedImage = !isEmpty(distributedImage.files) && (await uploadFile(formData));
        console.log(newUploadedImage);

        const imageIds = currentProduct.data.images
          .filter((_, index) => !!distributedImage.files.find((file) => file.index === index))
          .map((image) => ({ public_id: image.public_id }));

        const newImages = distributedImage.uploadedImages
          .concat(newUploadedImage ? newUploadedImage.data.data : [])
          .flat()
          .map((image, index) => ({
            ...image,
            type: primaryImage === index ? 'primary' : 'secondary',
          }));

        const apiRequests = [
          updateProduct(
            { ...data, images: newImages },
            { params: { id: currentProduct.data._id } },
          ),
        ];

        !isEmpty(imageIds) && apiRequests.push(deleteImage({ images: imageIds }));
        const [updatedProduct] = await toast.promise(
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
        console.log(updatedProduct.data.data);
        onUpdateProduct(currentProduct.data._id, updatedProduct.data.data);
      } else {
        const upload = await uploadFile(formData);
        const images = upload.data.data;
        const product = await toast.promise(
          createProduct({
            ...data,
            images: isArray(images)
              ? images.map((image, index) => ({
                  ...image,
                  type: index === primaryImage ? 'primary' : 'secondary',
                }))
              : { ...images, type: 'primary' },
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
        onAddNewProduct(product.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
          {currentProduct.isEdit ? 'Edit Product' : 'Create Product'}
        </h2>
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
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">
              Basic information
            </h5>
            <TextField name="name" label="Name" input="mt-2" />
            <TextField name="description" label="Description" />
          </div>

          <div className="bg-white pt-6 px-6">
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">Images</h5>
            <p>{errors.images?.message}</p>
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
              <h5 className="font-primary font-bold text-xl leading-7 text-primary">Categories</h5>
              <SelectField
                name="category"
                options={['ring', 'necklace', 'earring', 'bracelet']}
                wrapper="mt-5"
              />
            </div>
            <div className="bg-white pt-4 px-4 w-full">
              <h5 className="font-primary font-bold text-xl leading-7 text-primary">
                Visibility Status
              </h5>
              <RadioField
                name="visibilityStatus"
                options={productVisibilityStatus}
                wrapper="mt-5"
                subWrapper="flex items-center gap-4"
              />
            </div>
          </div>

          <div className="bg-white pt-4 px-4 w-full">
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">Discount</h5>
            <TextField name="discount" wrapper="mt-5" />
          </div>
          <div className="bg-white pt-4 px-4 w-full">
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">Stocks</h5>
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
            <p>{errors.stocks?.message}</p>
            <Button primary type="button" onClick={() => addStock()}>
              Add Stocks
            </Button>
          </div>
        </div>
      </FormProvider>
    </section>
  );
}
