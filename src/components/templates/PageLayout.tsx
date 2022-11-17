import { FC, ReactNode } from "react";
import { PageHead, Header, Footer } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";

interface Props {
  children: ReactNode;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <motion.div
      className="flex flex-col justify-between min-h-screen transition-colors ease-in-out duration-500 bg-white dark:bg-[#121212]"
      {...enterAnimation}
    >
      <PageHead
        title="Degen Wallpapers"
        description="Download your favoriate Solana NFTs as your phone wallpaper"
      />
      <Header />

      <main className="flex flex-col flex-grow justify-start items-center ">
        {children}
      </main>

      <Footer />
    </motion.div>
  );
};
export default PageLayout;
