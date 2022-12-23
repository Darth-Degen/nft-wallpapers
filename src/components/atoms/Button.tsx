import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { tapAnimation } from "@constants";
import { motion } from "framer-motion";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<Props> = (props: Props) => {
  const { children, className, ...componentProps } = props;
  const styles: string =
    "w-56 h-10 bg-indigo-600 dark:bg-indigo-500 text-white dark:text-white text-sm";

  return (
    <motion.div {...tapAnimation}>
      <button
        className={`${className} ${styles} relative flex justify-center border border-gray-300 rounded text-center p-2 font-semibold ${
          componentProps.disabled
            ? "cursor-not-allowed"
            : "hover:outline hover:outline-indigo-300 "
        }`}
        {...componentProps}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
