import { FC } from "react";
import { motion } from "framer-motion";

const LoadAnimation: FC = () => {
  return (
    <motion.div
      className="absolute top-[35%] left-[40%] w-10 h-10 bg-white dark:bg-indigo-400 dark:text-black flex justify-center items-center"
      animate={{
        scale: [1, 2, 2.2, 1.2, 1],
        rotate: [-90, 90, 180, 180, 0],
        borderRadius: ["10%", "10%", "50%", "50%", "10%"],
      }}
      transition={{
        duration: 3.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      {/* [-] */}
    </motion.div>
  );
};

export default LoadAnimation;
