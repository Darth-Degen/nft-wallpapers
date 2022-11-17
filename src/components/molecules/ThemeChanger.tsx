import { FC, useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@components";
import { useTheme } from "next-themes";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { largeClickAnimation } from "@constants";

const ThemeChanger: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <motion.div
          className="cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          {...(largeClickAnimation as Variants)}
        >
          <AnimatePresence exitBeforeEnter>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};
export default ThemeChanger;
