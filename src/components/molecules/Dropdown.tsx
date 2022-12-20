import { fastExitAnimation } from "@constants";
import { DropdownButton, DropdownItem } from "@components";
import { Collection } from "@types";
import { Dispatch, FC, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  handleClick: (item: Collection) => void;
  handleHover: Dispatch<SetStateAction<number>>;
  show: boolean;
  label: string;
  collections: Collection[];
}

const Dropdown: FC<Props> = (props: Props) => {
  const { handleClick, handleHover, show, label, collections } = props;

  return (
    <div
      onMouseEnter={() => handleHover(1)}
      onMouseLeave={() => handleHover(0)}
    >
      <DropdownButton isActive={show} label={label} />
      <AnimatePresence mode="wait">
        {show && (
          <motion.div className="absolute pt-2 " {...fastExitAnimation}>
            <ul className="rounded-sm border border-gray-300 divide-y shadow max-h-[200px] overflow-y-auto">
              {collections &&
                collections
                  .sort((a: Collection, b: Collection) =>
                    b.name.localeCompare(a.name)
                  )
                  .map((item: Collection) => (
                    <DropdownItem
                      item={item}
                      handleClick={handleClick}
                      key={item.id}
                    />
                  ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
