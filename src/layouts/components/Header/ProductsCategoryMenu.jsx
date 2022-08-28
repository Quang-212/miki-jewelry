import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { CaretDownIcon } from 'src/components/Icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import useRouter from 'src/hooks/useRouter';
import { NormalDivider } from 'src/components/Dividers';

import { PRODUCTS_CATEGORY_LINKS } from './nav-config';
import Button from 'src/components/Button';

export default function ProductsCategoryMenu({ href, title, button }) {
  const [openState, setOpenState] = useState(false);
  const buttonRef = useRef(null); // useRef<HTMLButtonElement>(null)

  const { push, pathname } = useRouter();

  let timeout; // NodeJS.Timeout
  const timeoutDuration = 400;

  const toggleMenu = (open) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  // Open the menu after a delay of timeoutDuration
  const onHover = (open, action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!open && !openState && action === 'onMouseEnter') ||
      (open && openState && action === 'onMouseLeave')
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout);
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
    // else: don't click! 😁
  };

  const handleClick = (open) => {
    setOpenState(!open); // toggle open state in React state
    // push('/products');
    clearTimeout(timeout); // stop the hover timer if it's running
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <div
            onMouseEnter={() => onHover(open, 'onMouseEnter')}
            onMouseLeave={() => onHover(open, 'onMouseLeave')}
            className="flex flex-col"
          >
            <Popover.Button
              ref={buttonRef}
              className={button}
              onClick={pathname === '/products' ? handleClick : () => push('/products')}
            >
              {title}
              <CaretDownIcon
                className={`${open ? 'rotate-270 transform' : 'rotate-180 transform'}`}
              />
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static className="absolute top-10">
                <ul className="grid grid-cols-4 content-center w-[1136px] h-[186px] bg-wrapper rounded-primary text-center">
                  {PRODUCTS_CATEGORY_LINKS.map((category, index) => (
                    <ul
                      key={index}
                      className="grid grid-rows-5 grid-flow-col content-center gap-2 "
                    >
                      <li>
                        <Button text internalLink={category.path} title="subtitle-1">
                          {category.heading}
                        </Button>
                      </li>
                      {category.content.map((subCategory, index) => (
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
                      <hr className="absolute top-7 left-[220px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                      <hr className="absolute top-7 left-[504px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                      <hr className="absolute top-7 left-[788px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                    </ul>
                  ))}
                </ul>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
    </div>
  );
}
