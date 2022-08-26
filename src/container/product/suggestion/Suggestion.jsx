import Button from 'src/components/Button';

export function Suggestion({ relatedProducts }) {
  return (
    <section className="flex flex-col gap-72-px mt-120-px container">
      {/* <div className="relative z-10 flex justify-between">
        <h2 className="heading-2">Có thể bạn cũng thích</h2>
      </div>
      <ul className="flex justify-between">
        {relatedProducts.map((product, index) => (
          <li key={index}>
            <CardProduct
              src={product.image}
              alt={product.title}
              width={254}
              height={307}
              placeholder="blur"
              title={product.title}
              price={product.price}
              wrapper="max-w-254-px"
              // onClick={handleClick}
            />
          </li>
        ))}
      </ul> */}
    </section>
  );
}
