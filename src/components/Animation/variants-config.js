export const LEFT_RIGHT = {
  offscreen: {
    x: -400,
    opacity: 0,
  },
  onscreen: {
    x: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};

export const RIGHT_LEFT = {
  offscreen: {
    x: 600,
    opacity: 0,
  },
  onscreen: {
    x: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};

export const TOP_BOTTOM = {
  offscreen: {
    opacity: 0,
    y: -400,
  },
  onscreen: {
    opacity: 1,
    y: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};

export const BOTTOM_TOP = {
  offscreen: {
    opacity: 0,
    y: 400,
  },
  onscreen: {
    opacity: 1,
    y: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};

export const SCALE_ZOOM = {
  offscreen: {
    scale: 0,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};

export const SCALE_MIN = {
  offscreen: {
    scale: 1.6,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2.4,
    },
  },
};
