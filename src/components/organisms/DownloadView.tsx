import { FC, useState } from "react";
import { TextInput, CheckBox, Button } from "@components";
import { Collection } from "@types";
import { fastExitAnimation } from "@constants";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import download from "downloadjs";

interface Props {
  collection: Collection;
  tokenId: number;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { collection, tokenId } = props;
  const [text, setText] = useState<string>();
  const [showLogo, setShowLogo] = useState<boolean>();

  const background: string = "bg-gray-100 dark:bg-indigo-00";

  const handleDownload = (): void => {
    const wallpaper: HTMLElement | null = document.getElementById("wallpaper");
    if (wallpaper) {
      htmlToImage.toPng(wallpaper).then(function (dataUrl) {
        download(dataUrl, "wallpaper.png");
      });
      // htmlToImage
      //   .toCanvas(wallpaper)
      //   .then(function (canvas: HTMLCanvasElement) {
      //     console.log("derp ", canvas);
      //     document.body.appendChild(canvas);
      //   });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start">
      {/* form */}
      <div className="flex flex-col gap-2 mt-8">
        <CheckBox label="Show Logo" handleToggle={setShowLogo} />
        <TextInput handleInput={setText} />
        <div className="lg:mt-10">
          <Button label="Download" handleClick={handleDownload} />
        </div>
      </div>
      {/* image */}
      <div
        className={`relative rounded-3xl h-[450px] w-[220px] outline outline-[11px] outline-[#121212] `}
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-5 w-20 bg-[#121212] rounded-b-lg"></div>
        {tokenId > 0 && (
          <div
            id="wallpaper"
            className={`flex flex-col justify-between items-center h-full ${background} `}
          >
            <AnimatePresence exitBeforeEnter>
              {showLogo ? (
                <motion.div key="logo" {...fastExitAnimation}>
                  <Image
                    src={collection.logo.path}
                    height={collection.logo.height}
                    width={collection.logo.width}
                    alt="Logo"
                    className="mt-16 px-6"
                  />
                </motion.div>
              ) : (
                <div></div>
              )}
            </AnimatePresence>

            <p className="px-5 text-black text-center font-mono">{text}</p>

            <motion.div {...fastExitAnimation}>
              {" "}
              <Image
                src={`${collection.url + (tokenId - 1)}.png`}
                height={220}
                width={220}
                alt="NFT"
                className="rounded-b-3xl"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadView;
