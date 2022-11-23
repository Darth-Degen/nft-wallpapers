import { FC, useCallback, useEffect, useState } from "react";
import { TextInput, CheckBox, Button } from "@components";
import { Collection } from "@types";
import { fastExitAnimation, midClickAnimation } from "@constants";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import download from "downloadjs";
import "dear-image.detect-background-color";
import DearImage from "dear-image";

interface Props {
  collection: Collection;
  tokenId: number;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { collection, tokenId } = props;
  const [text, setText] = useState<string>();
  const [showLogo, setShowLogo] = useState<boolean>();
  // const [colors, setColors] = useState<string[]>();
  const [background, setBackground] = useState<string>(
    "bg-gray-100 dark:bg-indigo-00"
  );

  const src = `${collection.url + (tokenId - 1)}.png`;

  const handleDownload = (): void => {
    const wallpaper: HTMLElement | null = document.getElementById("wallpaper");
    if (wallpaper) {
      htmlToImage.toPng(wallpaper).then(function (dataUrl) {
        download(dataUrl, "wallpaper.png");
      });
    }
  };

  //extract background from image
  const getBackground = useCallback(async () => {
    let url = src;
    let imgObj = new window.Image();
    imgObj.src = url + "?" + new Date().getTime();
    imgObj.setAttribute("crossOrigin", "");
    let bg = await DearImage.detectBackgroundColor(imgObj);
    setBackground(bg);
  }, [src]);

  useEffect(() => {
    getBackground();
  }, [getBackground]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 items-center sm:items-start">
      {/* form */}
      <div className="flex flex-col gap-2 mt-8">
        <CheckBox label="Show Logo" handleToggle={setShowLogo} />
        <TextInput handleInput={setText} />
        <div className="sm:mt-10">
          <Button label="Download" handleClick={handleDownload} />
        </div>
      </div>
      {/* mobile border */}
      <div className="relative rounded-3xl h-[450px] w-[220px] outline outline-[11px] outline-[#121212] bg-black">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-5 w-20 bg-[#121212] rounded-b-lg "></div>
        {tokenId > 0 && (
          <div
            id="wallpaper"
            className={`flex flex-col justify-between items-center h-full transition-colors ease-in-out duration-200`}
            style={{ backgroundColor: background }}
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

            <motion.div
              {...fastExitAnimation}
              className="transition-all ease-in-out duration-500"
            >
              <Image
                src={src}
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
// : (
//   <motion.div
//     className="absolute top-[35%] left-[40%] w-10 h-10 bg-white dark:bg-indigo-400 dark:text-black flex justify-center items-center"
//     animate={{
//       scale: [1, 2, 2.2, 1.2, 1],
//       rotate: [-90, 90, 180, 180, 0],
//       borderRadius: ["10%", "10%", "50%", "50%", "10%"],
//     }}
//     transition={{
//       duration: 3.5,
//       ease: "easeInOut",
//       times: [0, 0.2, 0.5, 0.8, 1],
//       repeat: Infinity,
//       repeatDelay: 1,
//     }}
//   >
//     {/* [-] */}
//   </motion.div>
// )
export default DownloadView;
