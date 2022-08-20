import { CardProduct } from 'src/components/Card';
import { useProducts } from 'src/hooks/useProducts';

const formatVndCurrency = (number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);

export function ProductsListSection({ products }) {
  return (
    <section className="container mt-10">
      <div>BreadCrumbs</div>
      <div className="flex justify-between mt-12">
        <span className="heading-2">Danh mục sản phẩm</span>
        <div>Sorting</div>
      </div>
      <ul className="flex justify-between flex-wrap gap-10 mt-8">
        {products.map((product) => (
          <li key={product._id}>
            <CardProduct
              src={product.images.find((image) => image.type === 'primary').url}
              alt={product.name}
              width={254}
              height={300}
              title={product.name}
              price={formatVndCurrency(product.stocks[0].price)}
              wrapper="max-w-254-px"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
