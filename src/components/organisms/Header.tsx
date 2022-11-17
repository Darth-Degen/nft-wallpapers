import { FC } from "react";
import { Logo, ThemeChanger } from "@components";

const Header: FC = () => {
  return (
    <header className="h-15 shadow-sm border-b border-gray-300 dark:border-gray-700 z-20 bg-white dark:bg-[#121212] transition-colors ease-in-out duration-500">
      <div className="px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        <Logo />
        <ThemeChanger />
      </div>
    </header>
  );
};

export default Header;
