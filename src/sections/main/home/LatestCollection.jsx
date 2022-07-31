import Image from 'next/image';

import Button from 'src/components/Button';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';

export function LatestCollectionSection() {
  return (
    <section className="relative w-full h-732-px mt-120-px">
      <Image
        src={images.homeLatestCollection}
        alt="Home latest collection"
        objectFit="contain"
        layout="fill"
        className="absolute object-90% scale-y-1.68 scale-x-1.75"
      />
      <div
        className="
          relative before:absolute before:w-full before:h-483.5-px before:bg-latest-collection-framer before:bg-no-repeat before:left-152-px before:top-[109px]
          after:absolute after:w-96 after:h-96 after:bg-latest-collection-line after:bg-no-repeat after:left-[784px] after:top-[109px]
        "
      ></div>
      <article className="relative flex flex-col gap-4 top-152-px left-52">
        <h6 className="text-5xl leading-64-px text-neutral-5">Bộ sưu tập mới nhất</h6>
        <h6 className="mt-10 font-secondary font-semibold text-5xl leading-64-px text-neutral-5">
          Ánh trăng người tình
        </h6>
        <p className="w-352-px font-secondary font-semibold leading-20-px text-neutral-5">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button outline internalLink={PATH.products} wrapper="w-152-px mt-12 py-3 px-8">
          Xem thêm
        </Button>
      </article>
    </section>
  );
}
