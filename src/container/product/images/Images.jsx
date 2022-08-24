import Image from 'src/components/Image';
import { images } from 'src/constants';

export function ProductImagesSection() {
  return (
    <section className="flex gap-10 max-w-[597px]">
      <div className="flex flex-col justify-between gap-3">
        <div className="overflow-hidden">
          <Image src={images.homeAbout} alt="" width={156} height={107} />
        </div>
        <div>
          <Image
            src={images.homeAbout}
            alt=""
            width={156}
            height={107}
            className="rounded-primary"
          />
        </div>
        <div>
          <Image src={images.homeAbout} alt="" width={156} height={107} />
        </div>
        <div>
          <Image src={images.homeAbout} alt="" width={156} height={107} />
        </div>
      </div>
      <Image src={images.homeAbout} alt="" width={450} height={465} className="rounded-primary" />
    </section>
  );
}
