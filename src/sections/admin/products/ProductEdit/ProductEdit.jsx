import { useForm } from 'react-hook-form';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Divider';
import { CheckBoxField, FormProvider, RadioField, TextField } from 'src/components/hook-forms';

export function ProductEdit() {
  const methods = useForm({
    defaultValues: {
      productPriceOld: '',
      sizeXs: false,
      sizeS: false,
      sizeM: false,
      sizeL: false,
      sizeXl: false,
    },
  });

  const { handleSubmit, setFocus, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const productSizes = [
    {
      name: 'sizeXs',
      id: 'xs',
      content: 'XS',
    },
    {
      name: 'sizeS',
      id: 's',
      content: 'S',
    },
    {
      name: 'sizeM',
      id: 'm',
      content: 'M',
    },
    {
      name: 'sizeL',
      id: 'l',
      content: 'XL',
    },
    {
      name: 'sizeXl',
      id: 'xl',
      content: 'XL',
    },
  ];

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="heading-2">Products Edit</h2>
        <Button primary title="uppercase">
          Save
        </Button>
      </div>
      <NormalDivider />
      <div className="flex">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Pricing Info</h5>
              <TextField
                name="productPriceOld"
                label="Product Price Old"
                wrapper="mt-5"
                input="mt-2"
              />
              <TextField name="productPriceNew" label="Product Price New" input="mt-2" />
              <TextField name="productCoupon" label="Product Coupon" />
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Visibility Status</h5>
              <RadioField
                name="productVisibilityStatus"
                option={[
                  {
                    id: 'published',
                    content: 'Published',
                  },
                  {
                    id: 'scheduled',
                    content: 'Scheduled',
                  },
                  {
                    id: 'hidden',
                    content: 'Hidden',
                  },
                ]}
                wrapper="mt-5"
                subWrapper="flex items-center gap-4"
              />
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Visibility Status</h5>
              <ul className="mt-5 flex flex-col gap-2">
                {productSizes.map((size) => (
                  <li key={size.id}>
                    <CheckBoxField
                      name={size.name}
                      value={{
                        id: size.id,
                        content: size.content,
                      }}
                      wrapper="flex items-center gap-4"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Categories</h5>
              <TextField name="productCategory" wrapper="mt-5" input="mt-2" />
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Tags</h5>
              <TextField name="productTag" wrapper="mt-5" input="mt-2" />
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Publish Schedule</h5>
              <TextField
                name="productPublishDate"
                label="Publish Date"
                type="date"
                wrapper="mt-5"
                input="mt-2"
              />
              <TextField name="productPublishTime" label="Publish Time" type="date" input="mt-2" />
            </div>

            <div className="bg-white pt-4 px-4">
              <h5 className="heading-5">Inventory Info</h5>
              <TextField name="productPublishDate" label="SKU" wrapper="mt-5" input="mt-2" />
              <TextField name="productPublishTime" label="Total Stock Quantity" input="mt-2" />
            </div>
            <button>submit</button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white pt-6 px-6">
              <h5 className="heading-5">Basic information</h5>
              <TextField name="productName" label="Name" wrapper="mt-5" input="mt-2" />
              <TextField name="productUrl" label="Product Identifier URL" input="mt-2" />
              <TextField name="productDescription" label="Product Description" />
            </div>

            <div className="bg-white pt-6 px-6">
              <h5 className="heading-5">Images</h5>
              <TextField
                name="productImage"
                label="Product Images Upload"
                type="file"
                wrapper="mt-5"
                input="mt-2"
              />
            </div>

            <div className="bg-white pt-6 px-6">
              <h5 className="heading-5">Search engine optimization</h5>
              <p>
                Provide information that will help improve the snippet and bring your product to the
                top of search engines.
              </p>
              <TextField name="productPageTitle" label="Page title" wrapper="mt-5" input="mt-2" />
              <TextField name="productMetaDescription" label="Meta description" input="mt-2" />
            </div>
          </div>
        </FormProvider>
      </div>
    </section>
  );
}
