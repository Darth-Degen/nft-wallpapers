import { FC, useState } from "react";

interface Props {
  handleInput: (value: string) => void;
}

const NumberInput: FC<Props> = (props: Props) => {
  const { handleInput } = props;

  const [value, setValue] = useState<string>();

  const charLim: number = 30;
  const styles: string = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
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
