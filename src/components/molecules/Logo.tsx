import { FC } from "react";

const Logo: FC = () => {
  return (
    <div className="my-2 flex items-center gap-2 text-gray-800 dark:text-gray-200 cursor-pointer transition-colors ease-in-out duration-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
      <span className="font-semibold text-2xl font-sans  whitespace-nowrap">
        Degen Papers
      </span>
    </div>
  );
};
export default Logo;
