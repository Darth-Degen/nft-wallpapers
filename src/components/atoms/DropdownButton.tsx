import { ArrowIcon } from "@components";
import { arrowVariants } from "@constants";
import { FC } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Props {
  isActive: boolean;
  label: string;
}

const DropdownButton: FC<Props> = (props: Props) => {
  const { isActive, label } = props;

  const { systemTheme, theme } = useTheme();

  const currentTheme: string | undefined =
    theme === "system" ? systemTheme : theme;
  const isDark: boolean = currentTheme === "dark";

  const styles: string = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  return (
    <button
      className={`relative flex justify-between ${styles} border border-gray-300 rounded items-center p-2 cursor-pointer`}
    >
      {label}
      <motion.div animate={isActive ? "end" : "start"} variants={arrowVariants}>
        <ArrowIcon color={isDark ? "#d1d5db" : "#222222"} />
      </motion.div>
    </button>
  );
};

export default DropdownButton;
