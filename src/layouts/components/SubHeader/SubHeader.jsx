import Image from 'next/image';
import { BellRingIcon, SearchIcon } from 'src/components/Icons';

export function SubHeader() {
  return (
    <header className="relative z-50 container">
      <nav className="flex justify-between pt-6 pb-4">
        <div className="flex relative">
          <input
            placeholder="Tìm kiếm"
            className="h-10 max-w-[228px] py-2 px-4 rounded-primary border border-neutral-1 bg-white"
          />
          <SearchIcon className="absolute mt-2 ml-48 cursor-pointer" />
        </div>
        <ul className="flex gap-8">
          <li>{<BellRingIcon className="fill-primary-1" />}</li>
          <li>
            <div className="flex flex-col">
              <span className="subtitle-1">ngockhoi96</span>
              <span className="caption">Admin Profile</span>
            </div>
          </li>
          <li>{/* <Image /> */}</li>
        </ul>
      </nav>
    </header>
  );
}
