import Image from '../../../../components/Image';

const formatVndCurrency = (number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);

const formatLocaleNumber = (number) => new Intl.NumberFormat('de-DE').format(number);

function myFunction(x) {
  alert('Cell index is: ' + x.cellIndex);
}

export const columnProducts = [
  {
    Header: 'Image',
    accessor: 'images',
    Cell: ({ row, value }) => (
      <Image
        src={value.find((image) => image.type === 'primary').url}
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
      const isLowStock = (asd) => asd <= 10;
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
              <tr
                key={index}
                className={
                  isLowStock(item.quantity)
                    ? 'bg-yellow-400'
                    : 'border-dashed border border-green-500'
                }
              >
                {Object.entries(item).map(([_, value]) => (
                  <td key={value} className="border-dashed border border-green-500">
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
