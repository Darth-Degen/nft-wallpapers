import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface Props {
  label: string;
  handleToggle: Dispatch<SetStateAction<boolean>>;
}

const CheckBox: FC<Props> = (props: Props) => {
  const { label, handleToggle } = props;
  const [checked, setChecked] = useState<boolean>(true);

  const styles = "w-56 h-10 bg-white dark:bg-[#121212] text-sm";

  //add max length check
  const onChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    handleToggle(checked);
  }, [checked, handleToggle]);

  return (
    <div
      className={`relative flex justify-between ${styles} border border-gray-300 rounded items-center p-2 `}
    >
      <p>{label}</p>
      <input
        onChange={() => onChange()}
        placeholder="Add Text"
        type="checkbox"
        checked={checked}
      />
    </div>
  );
};

export default CheckBox;
