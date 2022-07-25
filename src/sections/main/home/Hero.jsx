import Button from 'src/components/Button';

export function HeroSection() {
  return (
    <section className="relative bg-hero-image h-629-px bg-cover bg-center">
      <div className="flex w-auto h-full bg-hero-rgba">
        <div className="flex flex-col items-center gap-60-px m-auto">
          <h1 className="display text-neutral-5">Thế Giới Nữ Trang</h1>
          <div className="flex flex-col items-center">
            <hr className="w-824-px border-2" />
            <h3 className="my-5 heading-3 text-neutral-5">
              Tôn vinh vẻ đẹp phái nữ - Trao quà tặng - Trao yêu thương
            </h3>
            <hr className="w-824-px border-2" />
          </div>
          <Button outline internalLink="/">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
