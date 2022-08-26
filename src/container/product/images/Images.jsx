import { useState } from 'react';

import Image from 'src/components/Image';

export function Images({ images }) {
  const [mainImage, setMainImage] = useState(images.find((image) => image.type === 'primary').url);

  return (
    <section className="flex gap-10 max-w-[597px]">
      <ul className="flex flex-col justify-between gap-3">
        {images.map((image) => (
          <li key={image._id}>
            <Image
              src={image.url}
              alt=""
              width={156}
              height={107}
              className="rounded-primary"
              onClick={() => setMainImage(image.url)}
            />
          </li>
        ))}
      </ul>
      <Image src={mainImage} alt="" width={450} height={465} className="rounded-secondary" />
    </section>
  );
}
