export const openWithAnchor = (anchor) => {
  const key = `drawer${anchor}`;
  switch (anchor) {
    case 'left': {
      return '-translate-x-full border-r';
    }
    case 'right': {
      return 'translate-x-full border-l';
    }
    case 'top': {
      return 'translate-y-full border-b';
    }
    case 'bottom': {
      return '-translate-y-full border-t';
    }
  }
};
