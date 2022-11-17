import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface Props {
  handleInput: Dispatch<SetStateAction<string>>;
}

const NumberInput: FC<Props> = (props: Props) => {
  const { handleInput } = props;

  const [value, setValue] = useState<string>();

  const charLim = 50;
  const styles = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
    handleInput(val);
  };

  return (
    <input
      className={`relative flex justify-between ${styles} border border-gray-300 rounded items-center p-2 ${
        value && value.length >= charLim ? "text-red-500" : ""
      }`}
      onInput={(e) => onInput(e)}
      placeholder="Add Text"
      type="text"
      maxLength={charLim}
    />
  );
};

export default NumberInput;
