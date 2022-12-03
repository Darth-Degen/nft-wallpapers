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
import mergeImages from "merge-images";

interface Props {
  collection: Collection;
  tokenId: number;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { collection, tokenId } = props;
  const [text, setText] = useState<string>();
  const [showLogo, setShowLogo] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const [background, setBackground] = useState<string>(
    "bg-gray-100 dark:bg-indigo-00"
  );

  const src = `${collection.url + (tokenId - 1)}.png`;

  //download image
  const handleDownload = async () => {
    const scale = { scale: 5 };
    const wallpaper = document.getElementById("wallpaper");
    const token = document.getElementById("token-image");

    let wallpaperImage;
    let tokenImage;

    if (token && wallpaper) {
      await html2canvas(token, scale).then((canvas) => {
        tokenImage = canvas.toDataURL("image/jpeg");
      });

      await html2canvas(wallpaper, scale).then((canvas) => {
        wallpaperImage = canvas.toDataURL("image/jpeg");
      });

      if (tokenImage && wallpaperImage) {
        const image = await mergeImages([
          { src: wallpaperImage },
          { src: tokenImage, y: 1500 },
        ]);
        download(image, "degen-wallpaper.png", "image/png");
      }
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
      <div className="relative rounded-3xl h-[562.5px] w-[275px] outline outline-[11px] outline-[#121212] z-50">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-5 w-20 bg-[#121212] rounded-b-lg "></div>
        {tokenId > 0 && (
          <>
            {isLoading ? (
              <motion.div key="loading" {...exitAnimation}>
                <LoadAnimation />
              </motion.div>
            ) : (
              <>
                <motion.div
                  key="wallpaper"
                  id="wallpaper"
                  className={`flex flex-col justify-between items-center h-full transition-colors ease-in-out duration-200`}
                  style={{ backgroundColor: background }}
                >
                  <motion.div key="logo" {...fastExitAnimation}>
                    <img
                      src={collection.logo.path}
                      height={collection.logo.height}
                      width={collection.logo.width}
                      alt="Logo"
                      className={`pt-24 px-6 ${
                        showLogo ? "visbile" : "invisible"
                      }`}
                    />
                  </motion.div>

                  <p className="px-5 text-black text-center font-mono absolute bottom-1/2">
                    {text}
                  </p>
                </motion.div>
                <motion.div
                  {...fastExitAnimation}
                  className="transition-all ease-in-out duration-500 absolute bottom-0 z-0"
                >
                  <Image
                    src={src}
                    height={500}
                    width={500}
                    alt="NFT"
                    className="rounded-b-3xl"
                    id="token-image"
                  />
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default DownloadView;
