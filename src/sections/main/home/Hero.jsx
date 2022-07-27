import Button from 'src/components/Button';
import { PATH } from 'src/routes/path';

export function HeroSection() {
  return (
    <section className="relative z-10 h-629-px bg-hero-image bg-cover bg-center">
      <div className="flex w-auto h-full bg-hero-image-rgba">
        <div className="flex flex-col items-center gap-60-px m-auto">
          <h1 className="display text-neutral-5">Thế Giới Nữ Trang</h1>
          <div className="flex flex-col items-center">
            <hr className="w-824-px border-2" />
            <h3 className="my-5 heading-3 text-neutral-5">
              Tôn vinh vẻ đẹp phái nữ - Trao quà tặng - Trao yêu thương
            </h3>
            <hr className="w-824-px border-2" />
          </div>
          <Button outline internalLink={PATH.home}>
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
