import Button from 'src/components/Button';

export function HeroSection() {
  return (
    <section className="relative bg-hero-image h-629-px bg-cover bg-center">
      <div className=" bg-aa w-auto h-full flex">
        <div className="flex flex-col items-center gap-37-px m-auto">
          <h1 className="display leading-128-px text-neutral-5">Thế Giới Nữ Trang</h1>
          <div className="flex flex-col items-center mt-4">
            <hr className="w-824-px border-2" />
            <h3 className="heading-3 my-5 text-neutral-5">
              Tôn vinh vẻ đẹp phái nữ - Trao quà tặng - Trao yêu thương
            </h3>
            <hr className="w-824-px border-2" />
          </div>
          <Button internalLink="/" className="mt-6 py-2 px-6">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
