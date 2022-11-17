import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface Props {
  label: string;
  handleClick: () => void;
}

const CheckBox: FC<Props> = (props: Props) => {
  const { label, handleClick } = props;
  const styles =
    "w-56 h-10 bg-[#121212] dark:bg-gray-200 text-white dark:text-black text-sm";

  return (
    <button
      className={`relative flex justify-center ${styles} border border-gray-300 rounded text-center  p-2 font-semibold`}
      onClick={() => handleClick()}
    >
      {label}
    </button>
  );
};

export default CheckBox;
