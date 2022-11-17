import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="p-6 ">
      <div className="text-center text-sm dark:text-gray-400 text-gray-700 flex flex-col sm:flex-row justify-center items-center">
        <span className="dark:text-gray-200 text-gray-900 font-semibold text-lg mr-2">
          {" "}
          Degen Wallpapers
        </span>{" "}
        &copy; {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
