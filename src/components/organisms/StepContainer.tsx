import { ReactNode, FC } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Props {
  step: number;
  current: number;
  previous: number;
  children: ReactNode;
  zIndex?: string;
}

const StepContainer: FC<Props> = (props: Props) => {
  const { step, current, previous, children, zIndex } = props;

  const { systemTheme, theme } = useTheme();
  const currentTheme: string | undefined =
    theme === "system" ? systemTheme : theme;

  const isCurrent: boolean = step === current;
  const isPrevious: boolean = step === previous;
  const isPast: boolean = step < previous;
  const isPastOrPrevious: boolean = isPast || isPrevious;
  const isDark: boolean = currentTheme === "dark";

  const startDuration: number = 2;

  //TODO: get height from id
  const step3Height: number = 662.5;
  const yValue: number = step === 3 ? step3Height : 250;
  const delay: number =
    step === 1 ? 0 : step === 2 ? (isCurrent ? 1.5 : 0) : 1.5;
  const delay2: number = delay + startDuration - 0.5;
  const startPadding: number = step === 3 ? 50 : 70;

  const transitionAnimation = {
    initial: {
      y: isCurrent ? -yValue : 0,
      padding: startPadding,
      backgroundColor: isDark ? "#3730a3" : "#e5e7eb",
    },

    animate: {
      y: 0,
      padding: isPastOrPrevious ? (step === 2 ? 0 : 15) : startPadding,
      paddingBottom: isPastOrPrevious && step === 2 ? 15 : "auto",
      backgroundColor: isPastOrPrevious
        ? isDark
          ? "#121212"
          : "#ffffff"
        : isDark
        ? "#3730a3"
        : "#e5e7eb",
    },
    transition: { duration: startDuration, ease: "easeInOut", delay: delay },
  };

  const contentAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, delay: delay2, ease: "easeInOut" },
  };

  if (!isCurrent && !isPastOrPrevious) {
    return <></>;
  }

  return (
    <motion.div
      className={`w-full ${zIndex ? zIndex : isCurrent ? "z-0" : "z-20"}`}
      {...transitionAnimation}
    >
      <motion.div
        {...contentAnimation}
        className="flex flex-col justify-center items-center gap-2 relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default StepContainer;
