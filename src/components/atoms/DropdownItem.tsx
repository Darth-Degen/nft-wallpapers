import { FC } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Collection } from "@types";

interface Props {
  item: Collection;
  handleClick: (item: Collection) => void;
}

const DropdownItem: FC<Props> = (props: Props) => {
  const { item, handleClick } = props;

  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const styles = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  return (
    <motion.li
      key={item?.id}
      className={`${styles} px-2 cursor-pointer flex items-center hover:bg-[#f1f1f1] hover:dark:bg-[#6366f1]`}
      whileTap={{
        backgroundColor: isDark ? "#4f46e5" : "#e4e4e4",
      }}
      transition={{ duration: 0.05, ease: "easeInOut" }}
      onClick={() => handleClick(item)}
    >
      {item?.name}
    </motion.li>
  );
};

export default DropdownItem;
