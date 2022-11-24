import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, CheckBox, Button, LoadAnimation } from "@components";
import { Collection } from "@types";
import { fastExitAnimation, exitAnimation } from "@constants";
import Image from "next/image";
// import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import download from "downloadjs";
import "dear-image.detect-background-color";
//@ts-ignore
import DearImage from "dear-image";
import html2canvas from "html2canvas";

interface Props {
  collection: Collection;
  tokenId: number;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { collection, tokenId } = props;
  const [text, setText] = useState<string>();
  const [showLogo, setShowLogo] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [colors, setColors] = useState<string[]>();

  const timeoutRef = useRef<NodeJS.Timeout>();

  const [background, setBackground] = useState<string>(
    "bg-gray-100 dark:bg-indigo-00"
  );

  const src = `${collection.url + (tokenId - 1)}.png`;

  //download image
  const handleDownload = async () => {
    // handleLoad();

    let scale = { scale: 5 };
    const element = document.getElementById("wallpaper");

    if (element) {
      const canvas = await html2canvas(element, scale);
      const dataURL = canvas.toDataURL("image/png");
      download(dataURL, "degen-wallpaper.png", "image/png");
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

  const handleLoad = useCallback(() => {
    if (!tokenId || !collection) return;

    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [tokenId, collection]);

  useEffect(() => {
    handleLoad();
    return () => clearTimeout(timeoutRef.current);
  }, [handleLoad]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 items-center sm:items-start">
      {/* form */}
      <div className="flex flex-col gap-2 mt-8">
        <CheckBox label="Show Logo" handleToggle={setShowLogo} />
        <TextInput handleInput={setText} />
        <div className="sm:mt-10">
          <Button onClick={() => handleDownload()} disabled={isLoading}>
            Download
          </Button>
        </div>
      </div>
      {/* mobile border */}
      <div className="relative rounded-3xl h-[450px] w-[220px] outline outline-[11px] outline-[#121212] z-50">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-5 w-20 bg-[#121212] rounded-b-lg "></div>
        {tokenId > 0 && (
          <>
            {isLoading ? (
              <motion.div key="loading" {...exitAnimation}>
                <LoadAnimation />
              </motion.div>
            ) : (
              <motion.div
                key="wallpaper"
                id="wallpaper"
                className={`flex flex-col justify-between items-center h-full transition-colors ease-in-out duration-200`}
                style={{ backgroundColor: background }}
              >
                <AnimatePresence exitBeforeEnter>
                  {showLogo ? (
                    <motion.div key="logo" {...fastExitAnimation}>
                      <img
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
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default DownloadView;
