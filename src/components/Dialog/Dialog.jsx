import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import classNames from 'classnames/bind';
import { Fragment } from 'react';

import styles from './Dialog.module.css';

const mk = classNames.bind(styles);

export default function Dialog({ isOpen, closeModal, children, content, passProps }) {
  const classContent = mk('content', {
    [content]: content,
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="section"
        className={mk('dialog-wrapper')}
        onClose={closeModal}
        {...passProps}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={mk('backdrop')} />
        </Transition.Child>

        <div className={mk('scrollable-wrapper')}>
          <div className={mk('content-wrapper')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className={classContent}>{children}</HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
