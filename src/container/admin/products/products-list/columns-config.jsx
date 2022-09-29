import { formatLocaleNumber, formatVndCurrency } from 'src/utils/formatNumber';
import Image from '../../../../components/Image';

const isLowStock = (quantity) => Number(quantity.split('.').join('')) <= 10;
const isOutOfStock = (quantity) => Number(quantity.split('.').join('')) === 0;

export const columnProducts = [
  {
    Header: 'Image',
    accessor: 'images',
    Cell: ({ row, value }) => (
      <Image
        src={row.original.images.find((image) => image.type === 'primary')?.url}
        alt={row.original.name}
        width={80}
        height={80}
      />
    ),
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Stocks',
    accessor: 'stocks',
    Cell: ({ value }) => {
      value = value.map(({ _id, ...other }) => {
        other.price = formatVndCurrency(other.price);
        other.quantity = formatLocaleNumber(other.quantity);
        return other;
      });

      return (
        <table className=" table-fixed text-base text-gray-900">
          <thead className="p-2">
            <tr className="border-dashed border border-green-500">
              {Object.keys(value[0]).map((item, index) => (
                <th key={index} className="p-2 border-dashed border border-green-500">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {value.map((item, index) => (
              <tr key={index} className="border-dashed border border-green-500">
                {Object.entries(item).map(([key, value]) => (
                  <td
                    key={value}
                    className={
                      (isLowStock(item.quantity) && key === 'quantity') ||
                      (isOutOfStock(item.quantity) && key === 'quantity')
                        ? 'bg-yellow-400'
                        : 'border-dashed border border-green-500'
                    }
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },
  {
    Header: 'Visibility Status',
    accessor: 'visibilityStatus',
  },
  {
    Header: 'Discount',
    accessor: 'discount',
    Cell: ({ value }) => `${value}%`,
  },
];
