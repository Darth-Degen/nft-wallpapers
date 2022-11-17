import { FC } from "react";
import { TextInput, CheckBox, Button } from "@components";
import { Collection } from "@types";

interface Props {
  selected: Collection;
  handleToggle: (value: boolean) => void;
  handleTextInput: (value: string) => void;
  handleClick: () => void;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { selected, handleToggle, handleTextInput, handleClick } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start">
      {/* form */}
      <div className="flex flex-col gap-2 mt-8">
        <CheckBox label="Show Logo" handleToggle={handleToggle} />
        <TextInput handleInput={handleTextInput} />
        <div className="lg: mt-10">
          <Button label="Download" handleClick={handleClick} />
        </div>
      </div>
      {/* image */}
      <div className="flex flex-col gap-2">
        <div
          id="wallpaper"
          className="rounded-3xl h-[450px] w-[250px] bg-orange-200 "
        ></div>
      </div>
    </div>
  );
};

export default DownloadView;
