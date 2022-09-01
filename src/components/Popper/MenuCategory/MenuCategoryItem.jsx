export default function MenuCategoryItem({ data }) {
  return (
    <ul key={data.heading} className="grid grid-rows-5 grid-flow-col content-center gap-2">
      <li>
        <Button text internalLink={data.path} title="subtitle-1">
          {data.heading}
        </Button>
      </li>
      {data.content.map((subCategory, index) => (
        <li key={index}>
          <Button
            text
            internalLink={subCategory.path}
            wrapper="px-4 hover:text-primary-1 hover:font-semibold transition-all duration-500 ease-in-out"
          >
            {subCategory.title}
          </Button>
        </li>
      ))}
    </ul>
  );
}
