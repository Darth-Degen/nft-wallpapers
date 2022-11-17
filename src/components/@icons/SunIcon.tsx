import { FC } from "react";
import { exitAnimation } from "@constants";
import { motion } from "framer-motion";

const SunIcon: FC = () => {
  return (
    <motion.svg
      key="sun-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      {...exitAnimation}
    >
      <circle cx="12" cy="12" r="3" stroke="#DDD" strokeWidth="2" />
      <path d="M12 5V3" stroke="#DDD" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21V19" stroke="#DDD" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16.9497 7.05025L18.364 5.63604"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.63602 18.364L7.05023 16.9497"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 12L21 12"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12L5 12"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.9497 16.9497L18.364 18.364"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.63602 5.63603L7.05023 7.05025"
        stroke="#DDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

export default SunIcon;
