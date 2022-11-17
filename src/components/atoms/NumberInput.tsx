import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import debounce from "lodash.debounce";

interface Props {
  supply: number;
  handleInput: Dispatch<SetStateAction<number>>;
}

const NumberInput: FC<Props> = (props: Props) => {
  const { supply, handleInput } = props;
  const debouncer = debounce((value) => handleInput(value), 1000);

  const styles = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  //prevent keys
  const onKeyPress = (event: React.KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (Number((event.target as HTMLInputElement).value) > supply) {
      (event.target as HTMLInputElement).value = supply.toString();
    } else {
      debouncer(Number((event.target as HTMLInputElement).value));
    }
  };

  return (
    <input
      className={`relative flex justify-between ${styles} border border-gray-300 rounded items-center p-2`}
      onKeyPress={(e) => onKeyPress(e)}
      onInput={(e) => onInput(e)}
      placeholder="Enter ID"
      type="number"
      min={1}
      max={supply}
    />
  );
};

export default NumberInput;
