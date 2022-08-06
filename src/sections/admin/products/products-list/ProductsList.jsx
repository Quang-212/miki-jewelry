import Button from 'src/components/Button';
import { PATH } from 'src/routes/path';

export function ProductsList() {
  return (
    <section>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Admin/Products</span>
          <h2 className="heading-2">Products List</h2>
        </div>
        <Button primary internalLink={PATH.createProduct}>
          New Product
        </Button>
      </div>
      <div>
        
      </div>
    </section>
  );
}
