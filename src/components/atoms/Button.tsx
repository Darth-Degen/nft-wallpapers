import { FC } from "react";
import { tapAnimation } from "@constants";
import { motion } from "framer-motion";

interface Props {
  label: string;
  handleClick: () => void;
}

const CheckBox: FC<Props> = (props: Props) => {
  const { label, handleClick } = props;
  const styles: string =
    "w-56 h-10 bg-indigo-600 dark:bg-indigo-500 text-white dark:text-white text-sm";

  return (
    <motion.button
      className={`relative flex justify-center ${styles} border border-gray-300 rounded text-center p-2 font-semibold hover:outline hover:outline-indigo-300 `}
      onClick={() => handleClick()}
      {...tapAnimation}
    >
      {label}
    </motion.button>
  );
};

export default CheckBox;
