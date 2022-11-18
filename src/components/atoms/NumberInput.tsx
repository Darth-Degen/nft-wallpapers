import { FC } from "react";
import debounce from "lodash.debounce";

interface Props {
  supply: number;
  handleInput: (number: number) => void;
}

const NumberInput: FC<Props> = (props: Props) => {
  const { supply, handleInput } = props;
  const debouncer = debounce((value) => handleInput(value), 1000);

  const styles: string = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  //prevent keys
  const onKeyPress = (event: React.KeyboardEvent): void => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
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
