import Image from '../../../../components/Image';

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
    Header: 'Visibility Status',
    accessor: 'visibilityStatus',
  },
];
