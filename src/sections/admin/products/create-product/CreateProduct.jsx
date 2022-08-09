import axios from 'axios';
import qs from 'qs';
import { useForm } from 'react-hook-form';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Divider';
import { CheckBoxField, FormProvider, RadioField, TextField } from 'src/components/hook-forms';
import { productSizes, productVisibilityStatus } from '../products-config';

export function CreateProduct() {
  const methods = useForm({
    defaultValues: {
      priceOld: '',
      priceNew: '',
      coupon: '',
      visibilityStatus: '',
      sizeXs: false,
      sizeS: false,
      sizeM: false,
      sizeL: false,
      sizeXl: false,
      category: '',
      tag: '',
      publishDate: '',
      publishTime: '',
      sku: '',
      stockQuantity: '',
      name: '',
      url: '',
      description: '',
      pageTitle: '',
      metaDescription: '',
    },
  });

  const { handleSubmit, setFocus, reset } = methods;
  /* const [previewImg, setPreviewImg] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };*/
  const param = qs.stringify({
    category: {
      bracelet: 1,
    },
  });
  const onSubmit = async (data) => {
    const res = await axios({
      method: 'GET',
      url: `/api/product/${param}`,
    });
    console.log(res.data);
  };

  /*
  const uploadImg = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    // const item = JSON.parse(localStorage.getItem('JwtToken'));
    // const accesstoken = item.accessToken;
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/product/create',
        data: { image: base64EncodedImage },
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + accesstoken,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <section className="flex flex-col gap-8">
      <h2 className="heading-2">Products Edit</h2>
      <NormalDivider />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-4"
      >
        <div className="flex flex-col gap-4 w-2/6">
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
              option={productVisibilityStatus}
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
            <TextField name="productSku" label="SKU" wrapper="mt-5" input="mt-2" />
            <TextField name="productStockQuantity" label="Total Stock Quantity" input="mt-2" />
          </div>
          <button>submit</button>
        </div>

        <div className="flex flex-col gap-4 w-4/6">
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
              // onChange={handleChange}
            />
          </div>
          {/* <div>
            <img className=" w-52 h-52" src={previewImg} />
          </div> */}

          <div className="bg-white pt-6 px-6">
            <h5 className="heading-5">Search engine optimization</h5>
            <p className="mt-5">
              Provide information that will help improve the snippet and bring your product to the
              top of search engines.
            </p>
            <TextField name="productPageTitle" label="Page title" wrapper="mt-5" input="mt-2" />
            <TextField name="productMetaDescription" label="Meta description" input="mt-2" />
          </div>
          <Button primary title="uppercase">
            Create
          </Button>
        </div>
      </FormProvider>
    </section>
  );
}
