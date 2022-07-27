import Image from 'next/image';

import Button from 'src/components/Button';
import { EllipseDashIcon, EllipseIcon } from 'src/components/Icons';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';

export function AboutSection() {
  return (
    <section className="relative flex gap-42-px mt-120-px container">
      <div className="relative z-10 flex flex-col gap-8 w-2/4 max-w-544-px">
        <h2 className="heading-2">Về chúng tôi</h2>
        <q className="heading">Ngày mai phải tốt hơn ngày hôm nay</q>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button primary internalLink={PATH.about} className="mt-66-px w-217-px">
          Tìm hiểu thêm
        </Button>
      </div>
      <div className="relative">
        <Image
          src={images.homeAbout}
          alt="Picture of Miki about"
          width={548}
          height={537}
          priority
          objectFit="cover"
          placeholder="blur"
          className="z-10 rounded-secondary drop-shadow-about"
        />
        <EllipseIcon
          width="352"
          height="1041"
          cx="520.5"
          cy="520.5"
          r="520.5"
          fillOpacity="0.15"
          className="absolute top-[-40%] left-[64%]"
        />
        <EllipseIcon
          width="248"
          height="833"
          cx="416.5"
          cy="416.5"
          r="416.5"
          fillOpacity="0.1"
          className="absolute top-[-20%] left-[83%]"
        />
      </div>
      <EllipseDashIcon
        width="370"
        height="833"
        cx="-46.5"
        cy="416.5"
        r="416"
        className="absolute top-[48%] left-[0%]"
      />
      <EllipseDashIcon
        width="237"
        height="566"
        cx="-47"
        cy="123"
        r="122.5"
        className="absolute top-[103%] left-[0%]"
      />
    </section>
  );
}
