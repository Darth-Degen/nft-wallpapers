import { Variants } from "framer-motion"

//click animations
export const largeClickAnimation: Variants = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 1 },
};
export const midClickAnimation: Variants = {
  whileHover: { scale: 1.06 },
  whileTap: { scale: 1 },
};
export const smallClickAnimation: Variants = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 1 },
};

//tap animations
export const tapAnimation = {
  whileTap: { scale: 0.97 },
}

//opacity animations
export const exitAnimation = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1 },
  exit:{ opacity: 0 },
  transition:{ duration: 0.7, ease: "easeInOut" },
}

export const fastExitAnimation = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1 },
  exit:{ opacity: 0 },
  transition:{ duration: 0.25, ease: "easeInOut" },
}

export const vFastExitAnimation = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1 },
  exit:{ opacity: 0 },
  transition:{ duration: 0.05, ease: "easeInOut" },
}

export const enterAnimation = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1 },
  transition:{ duration: 1.4, ease: "easeInOut" },
}

//variants
export const arrowVariants = {
  start: {
    rotate: 0,
    transition: {
      duration: 0.4,
    },
  },
  end: {
    rotate: -180,
    transition: {
      duration: 0.4,
    },
  },
};

